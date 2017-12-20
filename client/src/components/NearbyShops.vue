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
            <v-btn v-on:click.native="like(shop._id)" :data-id="shop._id"  flat icon color="green">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            <v-btn :data-id="shop._id" flat icon color="red">
              <v-icon>thumb_down</v-icon>
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
      getLocation(){

      },
      async load(userLocation){
        console.log(this.$store.state.userLoc);
        const response = await ShopsService.nearbyShops({userLoc: this.$store.state.userLoc})
        this.shops = response.data
      },
      async like(id){
        await ShopsService.likeShop({userId: this.$store.state.user, shopId: id})
      }
    },
    beforeMount(){
      const self = this
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position){
            self.$store.dispatch('setLoc', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
          self.load(self.$store.state.userLoc)
        });
      } else {
          alert("Geolocation is not supported by this browser.")
      }
    }
  }
</script>

<style scoped>

</style>
