import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SinglePost from '../views/SinglePost.vue'
import ParticularUserPosts from '../views/ParticularUserPosts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/:user/:id',
    name: 'SinglePost',
    component: SinglePost
  },
  {
    path: '/:user',
    name: 'ParticularUserPosts',
    component: ParticularUserPosts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
