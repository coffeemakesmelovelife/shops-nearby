import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    isLoggedIn: false
  },
  mutations: {
    setUser(state, user){
      state.user = user
      state.isLoggedIn = true
      localStorage.setItem('isLoggedIn', true)
    },
    logout(state){
      state.user = null
      state.isLoggedIn = false
      localStorage.setItem('isLoggedIn', false)
    }
  },
  actions: {
    setUser({commit}, user){
      commit('setUser', user)
    },
    logout({commit}){
      commit('logout')
    }
  }
})
