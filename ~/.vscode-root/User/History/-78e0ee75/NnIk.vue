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

    <!-- 主视频框 -->
    <div class="main-video-box">
      <div class="video-content">
        <div class="question-area">
          <div class="main-question">问题：{{ currentQuestion }}</div>
          <div v-if="followUpQuestion" class="follow-up-question">
            追问：{{ followUpQuestion }}
          </div>
        </div>
      </div>
    </div>

    <!-- 外部控制栏 -->
    <div class="external-control-bar">
      <div class="control-wrapper">
        <button 
          :class="['record-btn', { recording: isRecording }]"
          @click="toggleRecording"
        >
          {{ isRecording ? '结束答题' : '开始答题' }}
        </button>
        
        <div class="progress-section">
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="time-counter">{{ formattedTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 保持原有脚本逻辑不变
</script>

<style scoped>
.interview-container {
  max-width: 1600px;
  margin: 2rem auto;
  padding: 0 2rem;
}

/* 主视频框样式 */
.main-video-box {
  position: relative;
  height: 90vh; /* 占据视口高度的75% */
  min-height: 600px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  background: url('./assets/interviewer.jpg') center/cover;
  margin-bottom: 2rem; /* 确保下方有空间 */
}

/* 视频内容区域 */
.video-content {
  position: relative;
  height: 100%;
}

/* 小窗口定位 */
.video-content::after {
  content: '';
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 15%;
  min-width: 180px;
  aspect-ratio: 3/4;
  background: url('./assets/interviewee.jpg') center/cover;
  border: 3px solid white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

/* 外部控制栏 */
.external-control-bar {
  position: relative;
  width: 100%;
  padding: 1rem 0;
}

.control-wrapper {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* 录音按钮 */
.record-btn {
  flex-shrink: 0;
  padding: 1.2rem 4rem;
  font-size: 1.25rem;
  font-weight: 500;
  border: none;
  border-radius: 50px;
  background: #2196F3;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(33,150,243,0.3);
}

.record-btn.recording {
  background: #f44336;
  box-shadow: 0 4px 12px rgba(244,67,54,0.3);
}

.record-btn:hover {
  transform: translateY(-2px);
}

/* 进度条区域 */
.progress-section {
  flex: 1;
  position: relative;
}

.progress-track {
  height: 12px;
  background: #eee;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2196F3, #4CAF50);
  transition: width 0.3s linear;
}

.time-counter {
  position: absolute;
  right: 0;
  top: -2rem;
  font-size: 0.9rem;
  color: #666;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main-video-box {
    height: 60vh;
    min-height: 400px;
    margin-bottom: 1.5rem;
  }

  .control-wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  .record-btn {
    width: 100%;
    padding: 1rem;
  }

  .progress-section {
    width: 100%;
  }

  .video-content::after {
    width: 25%;
    min-width: 120px;
    top: 1rem;
    right: 1rem;
  }
}
</style>