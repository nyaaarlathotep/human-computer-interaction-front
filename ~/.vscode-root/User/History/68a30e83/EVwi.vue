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

    <!-- 面试主界面 -->
    <div class="interview-box">
      <!-- 视频区域 -->
      <div class="video-area">
        <div class="question-area">
          <div class="main-question">问题：{{ currentQuestion }}</div>
          <div v-if="followUpQuestion" class="follow-up-question">
            追问：{{ followUpQuestion }}
          </div>
        </div>
      </div>

      <!-- 操作区域 -->
      <div class="controls">
        <button 
          :class="['action-btn', { recording: isRecording }]"
          @click="toggleRecording"
        >
          {{ isRecording ? '结束答题' : '开始答题' }}
        </button>
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
          <div class="time-display">{{ formattedTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRecording: false,
      progress: 0,
      duration: 0, // 秒
      timer: null,
      currentQuestion: "请简要介绍你的项目经历",
      followUpQuestion: "你在项目中遇到的最大挑战是什么？",
      // 可以添加更多问题...
    }
  },
  computed: {
    formattedTime() {
      const mins = Math.floor(this.duration / 60)
      const secs = this.duration % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }
  },
  methods: {
    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording()
      } else {
        this.startRecording()
      }
    },
    startRecording() {
      this.isRecording = true
      this.duration = 0
      this.progress = 0
      this.timer = setInterval(() => {
        this.duration++
        this.progress = (this.duration / 180) * 100 // 3分钟进度
        if (this.duration >= 180) this.stopRecording()
      }, 1000)
    },
    stopRecording() {
      this.isRecording = false
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
.interview-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
}

.signal {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #27ae60;
}

.dot {
  width: 12px;
  height: 12px;
  background: #27ae60;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.interview-box {
  position: relative;
  height: 800px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.video-area {
  position: relative;
  height: 70%;
  background: url('./assets/interviewer.jpg') center/cover;
}

.video-area::after {
  content: '';
  position: absolute;
  top: 20px;
  right: 20px;
  width: 120px;
  height: 160px;
  background: url('./assets/interviewee.jpg') center/cover;
  border: 3px solid white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.question-area {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
  color: white;
}

.main-question {
  font-size: 20px;
  margin-bottom: 10px;
}

.follow-up-question {
  font-size: 16px;
  opacity: 0.9;
}

.controls {
  height: 30%;
  padding: 30px;
  background: #f5f6fa;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.action-btn {
  align-self: center;
  padding: 15px 60px;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  background: #3498db;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn.recording {
  background: #e74c3c;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.progress-container {
  width: 100%;
  height: 8px;
  background: #ddd;
  border-radius: 4px;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: #3498db;
  border-radius: 4px;
  transition: width 1s linear;
}

.time-display {
  position: absolute;
  right: 0;
  top: -25px;
  font-size: 14px;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .interview-box {
    height: 500px;
  }
  
  .video-area::after {
    width: 80px;
    height: 100px;
  }
  
  .main-question {
    font-size: 16px;
  }
}
</style>