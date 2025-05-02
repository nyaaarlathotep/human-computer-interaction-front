import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/upload',
    component: () => import('./UploadResume.vue')
  },
  {
    path: '/experience',
    component: () => import('./DirectExperience.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;