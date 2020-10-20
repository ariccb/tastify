import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/mainpage',
    name: 'MainPage',
    // route level code-splitting
    // this generates a separate chunk (mainpage.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "mainpage" */ '../views/MainPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
