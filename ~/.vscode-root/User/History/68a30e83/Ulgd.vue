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

    <!-- 扩大后的面试主界面 -->
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
      duration: 0, // 当前持续时间（秒）
      timer: null,
      currentQuestion: "请简要介绍你的项目经历",
      followUpQuestion: "你在项目中遇到的最大挑战是什么？"
    }
  },
  computed: {
    formattedTime() {
      const secs = 30 - this.duration
      return `${Math.max(secs, 0)}s` // 显示剩余时间
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
        if (this.duration >= 30) {
          this.stopRecording()
          return
        }
        this.duration++
        this.progress = (this.duration / 30) * 100
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
  max-width: 1400px;  /* 扩大容器宽度 */
  margin: 20px auto;
  padding: 20px;
}

.interview-box {
  position: relative;
  height: 700px;  /* 增加高度 */
  width: 100%;    /* 占满容器宽度 */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.video-area {
  position: relative;
  height: 75%;  /* 增加视频区域比例 */
  background: url('./assets/interviewer.jpg') center/cover;
}

.video-area::after {
  content: '';
  position: absolute;
  top: 20px;
  right: 20px;
  width: 160px;  /* 增大画中画尺寸 */
  height: 200px;
  background: url('./assets/interviewee.jpg') center/cover;
  border: 3px solid white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* 其他原有样式保持不变... */

.progress-container {
  width: 100%;
  height: 10px;  /* 加粗进度条 */
}

/* 移动端适配调整 */
@media (max-width: 768px) {
  .interview-box {
    height: 500px;
  }
  
  .video-area::after {
    width: 100px;
    height: 140px;
  }
}
</style>