<template>
  <v-toolbar dark color="primary">

    <v-toolbar-title class="white--text">Shops Nearby</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat dark @click="navigateTo({name: 'nearby-shops'})">Nearby Shops</v-btn>
      <v-btn flat dark>My Preferred Shops</v-btn>
      <v-btn flat dark @click="navigateTo({name: 'login'})">Login</v-btn>
      <v-btn flat dark @click="navigateTo({name: 'register'})">Register</v-btn>
      <v-btn flat dark>Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    methods: {
      navigateTo(route){
        this.$router.push(route)
      }
    }
  }
</script>

<style scoped>

</style>
