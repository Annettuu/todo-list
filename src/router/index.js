import { createRouter, createWebHistory } from 'vue-router';
import VHome from '../pages/v-home/v-home.vue';
import taskEditing from '../pages/task-editing/task-editing.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: VHome
  },
  {
    path: '/taskEditing',
    name: 'taskEditing',
    component: taskEditing
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
