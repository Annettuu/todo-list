import { createRouter, createWebHistory } from 'vue-router'
import VHome from '../pages/v-home.vue'
import formTask from '../pages/form-task.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: VHome
  },
  {
    path: '/formTask',
    name: 'formTask',
    component: formTask
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
