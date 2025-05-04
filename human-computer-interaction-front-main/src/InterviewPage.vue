<template>
  <div class="interview-container">

    <!-- 新增右侧会话面板 -->
    <div class="chat-panel" :class="{ expanded: isChatExpanded }">
      <!-- 选项卡 -->
      <div class="chat-tab" @click="toggleChat">
        {{ isChatExpanded ? '收起会话' : '展开会话' }}
      </div>

      <!-- 对话容器 -->
      <div v-if="isChatExpanded" class="chat-container">
        <div class="chat-history">
          <div v-for="(msg, index) in chatMessages" :key="index"
               :class="['message', msg.sender]">
            <div class="message-content">{{ msg.content }}</div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>
      </div>
    </div>
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

      isChatExpanded: false,
      chatMessages: [
        {
          sender: 'ai',
          content: '欢迎参加AI面试，请准备好后点击开始答题',
          time: '10:00'
        },
        {
          sender: 'user',
          content: '我已准备好，可以开始面试',
          time: '10:01'
        },
        {
          sender: 'ai',
          content: '请进行自我介绍',
          time: '10:02'
        },
        {
          sender: 'user',
          content: '我叫xxx，毕业于xx大学，意向岗位为xx。我的工作经历有.....',
          time: '10:04'
        },
      ]
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
        this.$router.push("/interview-report")
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
    },
    toggleChat() {
      this.isChatExpanded = !this.isChatExpanded
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
  height: 850px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.video-area {
  position: relative;
  height: 80%;
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

.chat-panel {
  position: fixed;
  right: -40%; /* 与width保持同步 */
  width: 40%;
  transform: translateY(-50%) translateX(0); /* 移除多余变换 */
  top: 50%;
  height: 80%;
  transition: all 0.3s ease;
  z-index: 100;
}

.chat-panel.expanded {
  right: 0;
}

/* 选项卡样式 */
.chat-tab {
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  padding: 15px 8px;
  background: #3498db;
  color: white;
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.chat-tab:hover {
  background: #2980b9;
}

/* 对话容器 */
.chat-container {
  height: 100%;
  background: white;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  border-radius: 20px 0 0 20px;
}

.chat-history {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  margin: 12px 0;
  max-width: 75%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  width: fit-content;
}

/* 面试官消息样式 */
.message.ai {
  align-self: flex-start;
  margin-right: 15%;
  .message-content {
    background: #f1f2f6;
    border-radius: 18px 18px 18px 4px; /* 左侧圆角更大 */
  }
  .message-time {
    text-align: left;
    margin-left: 12px;
  }
}

/* 用户消息样式 */
.message.user {
  align-self: flex-end;
  margin-left: auto;
  margin-right: 0;
  .message-content {
    background: #3498db;
    color: white;
    border-radius: 18px 18px 4px 18px; /* 右侧圆角更大 */
  }
  .message-time {
    text-align: right;
    margin-right: 12px;
  }
}

/* 消息内容样式 */
.message-content {
  padding: 12px 16px;
  line-height: 1.5;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  position: relative;
  white-space: pre-wrap; /* 保留换行 */
  word-break: break-word; /* 自动换行 */
}

/* 消息时间样式 */
.message-time {
  font-size: 12px;
  color: #95a5a6;
  margin-top: 6px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .chat-panel {
    width: 250px;
  }

  .chat-tab {
    left: -50px;
    padding: 12px 6px;
  }
}
</style>