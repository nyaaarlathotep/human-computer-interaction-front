import { createRouter, createWebHistory } from 'vue-router';
import UploadResume from './UploadResume.vue'
import HomePage from './HomePage.vue'
import InterviewReport from "@/InterviewReport.vue";
import UserCenter from "@/UserCenter.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
      },
  {
    path: '/upload',
    name: 'Upload',
    component: UploadResume // 必须指向正确的组件
  },
    {
        path: '/interview-report',
        name: 'InterviewReport',
        component: InterviewReport
    },
    {
        path: '/user-center',
        name: 'UserCenter',
        component: UserCenter
    },
  {
    path: '/interview',
    component: () => import('./InterviewPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;