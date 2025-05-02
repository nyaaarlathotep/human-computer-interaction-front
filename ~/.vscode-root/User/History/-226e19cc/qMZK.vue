<template>
  <div class="container">
    <!-- 左上角标题 -->
    <h1 class="title">我的简历</h1>

    <!-- 按钮容器 -->
    <div class="button-container">
      <router-link 
        to="/upload" 
        class="action-button upload-button"
      >
        上传简历
      </router-link>
      
      <router-link 
        to="/experience" 
        class="action-button experience-button"
      >
        直接体验
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  position: relative;
}

.title {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  color: #333;
  margin: 0;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 100vh;
}

.action-button {
  padding: 20px 40px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.upload-button {
  background-color: #4CAF50;
  color: white;
}

.experience-button {
  background-color: #2196F3;
  color: white;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .button-container {
    flex-direction: column;
  }
  
  .title {
    font-size: 20px;
    top: 15px;
    left: 15px;
  }
}
</style>