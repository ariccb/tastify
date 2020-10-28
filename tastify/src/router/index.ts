import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import MainPage from '../views/MainPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/MainPage',
    name: 'MainPage',
    component: MainPage
  }
  
]

const router = new VueRouter({
  routes
})

export default router
