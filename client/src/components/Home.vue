<template>
  <div class="container">
    <h1 class="text-center">Shops Nearby App</h1>
    <div class="col-md-6 offset-3">
    <form v-on:submit='authenticate'>
      <div class="form-group">
      <label for="email">Email</label>
      <input v-model='user.email' type="email" class="form-control" name="email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model='user.password' type="password" class="form-control" name="password">
    </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Home',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async authenticate (e){
      await e.preventDefault()
      AuthService.login(this.user)
    }
  }
}
</script>

<style scoped>

</style>
