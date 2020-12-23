import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home,
    meta: {
      checkAuth: true
    }
  },
  {
    path: '/record',
    name: 'Record',
    props: true,
    meta: {
      checkAuth: true
    },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/preview',
    name: 'Preview',
    props: true,
    component: () => import('../views/Preview.vue')
  },
  {
    path: '/login',
    name: 'Login',
    props: true,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    props: true,
    component: () => import('../views/Registration.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
