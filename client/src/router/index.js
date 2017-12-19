import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NearbyShops from '@/components/NearbyShops'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/nearby-shops',
      name: 'nearby-shops',
      component: NearbyShops,
      meta: {requiresAuth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuth = localStorage.getItem('isLoggedIn')
    console.log(isAuth);
    if (isAuth == true) {
      next()
    } else {
      next({name: 'login'})
    }
  }
  next()
})

export default router
