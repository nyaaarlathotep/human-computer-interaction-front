<template>
  <div class="container">
    <!-- 左上角标题 -->
    <h1 class="title">我的简历</h1>

    <!-- 主要内容区域 -->
    <div class="content-wrapper">
      <!-- 新增提示语 -->
      <div class="tips">
        还未上传简历，上传后可体验专属面试官练习服务
      </div>

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
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  position: relative;
}

.title {
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 28px;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.tips {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 40px;
  font-size: 24px;
  max-width: 400px;
  line-height: 1.6;
  padding: 0 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
}

.action-button {
  padding: 25px 60px;
  font-size: 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 220px;
}

.upload-button {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.experience-button {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  opacity: 0.95;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .title {
    font-size: 24px;
    top: 20px;
    left: 20px;
  }

  .button-container {
    flex-direction: column;
    gap: 30px;
  }

  .action-button {
    padding: 20px 40px;
    font-size: 18px;
    width: 100%;
    min-width: auto;
  }

  .tips {
    font-size: 16px;
    margin-bottom: 30px;
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .tips {
    font-size: 14px;
  }
}
</style>