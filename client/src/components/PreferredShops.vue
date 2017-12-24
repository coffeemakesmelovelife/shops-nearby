<template>
  <v-container grid-list-md text-xs-center>
    <h5 v-if="!hasShops">You haven't liked any shops so far!</h5>
  <v-layout row wrap>
      <v-flex v-for="(shop, key) in shops" xs12 sm6 md4>
        <transition name="fade">
        <v-card v-if="shop.show">
          <v-card-media :src="shop.picture" height="150px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3  class="text-md-left headline mb-0">{{shop.name}}</h3><br>
              <div class="text-md-left"><v-icon>map</v-icon> &nbsp; {{shop.location.dist}} km away</div>
              <div class="text-md-left"><v-icon>email</v-icon> &nbsp; {{shop.email}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn v-on:click.native="remove(shop, key)" :data-id="shop._id" flat color="red">
              <v-icon>remove_circle</v-icon>&nbsp; Remove
            </v-btn>
          </v-card-actions>
        </v-card>
      </transition>
      </v-flex>
    </v-layout><br>
    <v-pagination
      v-model="pagination.page"
      :length="pagination.pages"
      total-visible="9"
      @input="load"></v-pagination>
  </v-container>
</template>


<script>
import AuthService from '@/services/AuthService'
import ShopsService from '@/services/ShopsService'

  export default {
    data: () => ({
      shops: [],
      pagination: {
        page: 0,
        pages: 0
      }
    }),
    computed: {
      hasShops: function(){
        return this.shops.length >= 1
      }
    },
    methods: {
      async load(page){
        const response = await ShopsService.preferredShops({
          userId: this.$store.state.user,
          userLoc: this.$store.state.userLoc,
          page: page
        })
        response.data.shops.map((obj) => {
            obj.show = true;
            return obj;
        })
        console.log(response.data.shops);
        this.shops = response.data.shops
        this.pagination.page = response.data.page
        this.pagination.pages = response.data.numPages
      },
      async remove(shop, key){
        const response = await ShopsService.removeLiked({userId: this.$store.state.user, shopId: shop._id})
        if(response.statusText == 'OK'){
          shop.show = false
          var self = this
          setTimeout(function(){
            self.shops.splice(key, 1)
            self.load() // this will repaint the layout and replace the gone element
          }, 1000)
        }
      }
    },
    beforeMount(){
      this.load()
    }
  }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
