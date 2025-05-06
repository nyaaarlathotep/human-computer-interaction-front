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
        <video 
  ref="videoPlayer"
  class="video-background"
  :src="currentVideoSrc"
  playsinline
  autoplay
  @loadedmetadata="handleVideoReady"
  @error="handleVideoError"
  @timeupdate="checkVideoPlaying"
></video>
      <div class="interviewee-overlay"></div>
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
      duration: 0,
      timer: null,
      currentQuestion: "请简要介绍你的项目经历",
      followUpQuestion: "你在项目中遇到的最大挑战是什么？",
      currentVideoIndex: 0,
      totalVideos: 4, // 根据实际视频数量修改
      videoSources: [
        '/videos/1.mp4',
        '/videos/2.mp4',
        '/videos/3.mp4',
        '/videos/4.mp4'
      ]
    }
  },
  computed: {
    formattedTime() {
      const mins = Math.floor(this.duration / 60)
      const secs = this.duration % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    currentVideoSrc() {
      return `/videos/${this.currentVideoIndex + 1}.mp4`
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
        this.progress = (this.duration / 30) * 100
        if (this.duration >= 30) this.stopRecording()
      }, 1000)
    },
    stopRecording() {
      this.isRecording = false
      clearInterval(this.timer)
      if (this.currentVideoIndex < this.totalVideos - 1) {
        this.currentVideoIndex++
      }
    },
    playVideo() {
      const video = this.$refs.videoPlayer
      video.play().catch(error => {
        console.error('视频播放失败:', error)
      })
    }
  },
  mounted() {
    console.log('视频路径验证:', this.currentVideoSrc)

    this.playVideo()
  },
  handleVideoReady() {
    const video = this.$refs.videoPlayer
    console.log('视频元数据加载完成', {
      width: video.videoWidth,
      height: video.videoHeight
    })
    
    // 强制播放（处理浏览器自动播放策略）
    const playPromise = video.play()
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('自动播放被阻止，需要用户交互',error)
        // 可以在这里添加播放按钮覆盖层
      })
    }
  },
  
  handleVideoError(error) {
    console.error('视频加载错误:', error.target.error)
    // 错误代码对照：
    // 1 = MEDIA_ERR_ABORTED (用户取消)
    // 2 = MEDIA_ERR_NETWORK 
    // 3 = MEDIA_ERR_DECODE
    // 4 = MEDIA_ERR_SRC_NOT_SUPPORTED
  },
  
  checkVideoPlaying() {
    if (this.$refs.videoPlayer.readyState > 2) {
      console.log('视频实际播放状态:', !this.$refs.videoPlayer.paused)
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


/* 新增视频样式 */
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持比例填充 */
}

.video-area {
  position: relative;
  width: 100%;
  /* 创建1:1宽高比 */
  padding-top: 65%; /* 关键样式 */
  background: #000; /* 视频加载前的背景色 */
  overflow: hidden;
}

/* 小窗口调整 */
.video-area::after {
  /* 原有样式保持不变 */
  z-index: 2; /* 确保在视频上方 */
}

.interviewee-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 15%;  /* 响应式宽度 */
  max-width: 120px;
  height: 20%; /* 响应式高度 */
  max-height: 160px;
  background: url('./assets/interviewee.jpg') center/cover;
  border: 3px solid white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 3; /* 确保在视频上方 */
  /* 添加悬停动画 */
  transition: transform 0.3s ease;
}

.interviewee-overlay:hover {
  transform: scale(1.05);
  cursor: pointer;
}

/* 问题区域层级调整 */
.question-area {
  /* 原有样式保持不变 */
  z-index: 4; /* 确保在最顶层 */
}

/* 视频加载指示器 */
.video-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 2;
}


.question-area {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
  color: white;
  z-index: 2;
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
  height: 20%;
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
  position: relative;
  width: 100%;
  max-width: 800px; /* 根据需求调整 */
  margin: 0 auto;
}
  
  
  

  
  .main-question {
    font-size: 16px;
  }
}
</style>