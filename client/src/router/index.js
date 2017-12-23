import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NearbyShops from '@/components/NearbyShops'
import PreferredShops from '@/components/PreferredShops'

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
    },
    {
      path: '/preferred-shops',
      name: 'preferred-shops',
      component: PreferredShops,
      meta: {requiresAuth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !from.meta.requiresAuth) {
    var isAuth = localStorage.getItem('isLoggedIn')
    // just figured out it returns string and not bool after hours of confusion lol
    if (isAuth == 'true') {
      next()
    } else if(isAuth == 'false') {
      next({name: 'login'})
    }
  }
  next()
})

export default router
