import { createRouter, createWebHistory } from 'vue-router';
import UploadResume from './UploadResume.vue'

const routes = [
  {
    path: '/upload',
    name: 'Upload',
    component: UploadResume // 必须指向正确的组件
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