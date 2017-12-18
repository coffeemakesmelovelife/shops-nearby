<template>
  <v-flex xs12 md6 offset-md3>
  <h3>Login</h3>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
    <v-text-field label="Password"
              v-model="password"
              :rules="passRules"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              counter
              required
            ></v-text-field>
    <v-btn @click="submit" :disabled="!valid">Submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</v-flex>
</template>


<script>
import AuthService from '@/services/AuthService'
  export default {
    data: () => ({
      valid: true,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => v && v.length >= 2 || 'Password must more than 2 characters'
      ],
      e1: true
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          AuthService.login({
            email: this.email,
            password: this.password
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>

</style>
