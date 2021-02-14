import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Create',
    component: () => import('../views/Create.vue')
  },
  {
    path: '/List',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/Task/:id',
    name: 'Task',
    component: () => import('../views/Task.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
