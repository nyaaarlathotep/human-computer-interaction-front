import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/upload',
      name: 'Upload',
      component: UploadResume // 必须指向正确的组件
    },
    // 其他路由...
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router