/* eslint-disable no-undef */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register/Register.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/retrieval-password',
    name: 'RetrievalPassword',
    component: () => import(/* webpackChunkName: "retrieval-password" */ '../views/RetrievalPassword/RetrievalPassword.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
