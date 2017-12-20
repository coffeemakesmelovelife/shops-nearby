<template>
  <v-container grid-list-md text-xs-center>
  <v-layout row wrap>
      <v-flex v-for="shop in shops" xs12 sm6 md4>
        <v-card>
          <v-card-media :src="shop.picture" height="150px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{shop.name}}</h3><br>
              <div><v-icon>email</v-icon> &nbsp; {{shop.email}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn v-on:click.native="remove(shop._id)" :data-id="shop._id" flat color="red">
              <v-icon>remove_circle</v-icon>&nbsp; Remove
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import AuthService from '@/services/AuthService'
import ShopsService from '@/services/ShopsService'

  export default {
    data: () => ({
      shops: []
    }),
    methods: {
      async load(userId){
        const response = await ShopsService.preferredShops(userId)
        this.shops = response.data
      },
      async remove(id){
        await ShopsService.removeLiked({userId: this.$store.state.user, shopId: id})
      }
    },
    beforeMount(){
      this.load({userId: this.$store.state.user})
    }
  }
</script>

<style scoped>

</style>
