import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SinglePost from '../views/SinglePost.vue'
import ParticularUserPosts from '../views/ParticularUserPosts'
import Login from '../views/Login.vue'
import Registration from '../views/Registration'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/post/:user/:id',
    name: 'SinglePost',
    component: SinglePost
  },
  {
    path: '/posts/:user',
    name: 'ParticularUserPosts',
    component: ParticularUserPosts
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
