<template>
  <v-flex xs12 md6 offset-md3>
  <h3>Register</h3>
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
            <v-text-field label="Confirm password"
                      v-model="repassword"
                      :rules="repassRules"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e2 = !e2)"
                      :type="e2 ? 'password' : 'text'"
                      counter
                      required
                    ></v-text-field>
                    <p class="err">{{error}}</p>
    <v-btn @click="register" :disabled="!valid">Submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</v-flex>
</template>


<script>
import AuthService from '@/services/AuthService'
  export default {
    data: () => ({
      error: '',
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
      repassword: '',
      repassRules: [
        (v) => !!v || 'Password is required',
        (v) => v && v.length >= 2 || 'Password must more than 2 characters'
        // TODO: password equals
      ],
      e1: true,
      e2: true
    }),
    methods: {
      async register () {
        if (this.$refs.form.validate()) {
          const response = await AuthService.register({
            email: this.email,
            password: this.password,
            repassword: this.repassword
          })
          if (response.data.error) {
            console.log(response.data.error);
            this.error = response.data.error
          } else if (response.data.success) {
            this.$router.push({name:'login'})
          }
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>
  .err{
    color: red
  }
</style>
