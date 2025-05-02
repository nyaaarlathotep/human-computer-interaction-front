<template>
  <div class="interview-container">
    <!-- 标题栏 -->
    <div class="header">
      <h2>AI 面试</h2>
      <div class="signal">
        <span class="dot"></span>
        <span>信号良好</span>
      </div>
    </div>

    <!-- 面试主框 -->
    <div class="interview-box">
      <div class="video-area">
        <div class="question-area">
          <div class="main-question">问题：{{ currentQuestion }}</div>
          <div v-if="followUpQuestion" class="follow-up-question">
            追问：{{ followUpQuestion }}
          </div>
        </div>
      </div>
    </div>

    <!-- 外部控制栏 -->
    <div class="external-controls">
      <button 
        :class="['action-btn', { recording: isRecording }]"
        @click="toggleRecording"
      >
        {{ isRecording ? '结束答题' : '开始答题' }}
      </button>
      <div class="progress-wrapper">
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="time-display">{{ formattedTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 保持与之前相同的脚本部分
</script>

<style scoped>
.interview-container {
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 30px;
}

.header {
  margin-bottom: 30px;
}

.interview-box {
  position: relative;
  height: 700px; /* 增加框体高度 */
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  margin-bottom: 30px; /* 为外部控制栏留出空间 */
}

.video-area {
  height: 100%; /* 占满整个框体 */
}

/* 调整小窗口尺寸 */
.video-area::after {
  width: 160px;
  height: 200px;
  top: 30px;
  right: 30px;
}

.external-controls {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 0 20px;
}

.action-btn {
  padding: 18px 80px;
  font-size: 20px;
  border-radius: 40px;
  order: 1; /* 按钮在左 */
}

.progress-wrapper {
  flex: 1;
  order: 2; /* 进度条在右 */
}

.progress-container {
  height: 12px;
  border-radius: 6px;
}

.progress-bar {
  height: 100%;
}

.time-display {
  margin-top: 8px;
  text-align: right;
  font-size: 16px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .interview-box {
    height: 500px;
    margin-bottom: 20px;
  }

  .external-controls {
    flex-direction: column;
    gap: 15px;
  }

  .action-btn {
    width: 100%;
    padding: 15px;
    order: 2;
  }

  .progress-wrapper {
    width: 100%;
    order: 1;
  }

  .video-area::after {
    width: 100px;
    height: 140px;
  }
}

@media (max-width: 480px) {
  .interview-box {
    height: 400px;
  }
  
  .main-question {
    font-size: 18px;
  }
  
  .follow-up-question {
    font-size: 14px;
  }
}
</style>