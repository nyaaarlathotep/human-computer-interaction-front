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
        <!-- 新增摄像头画面 -->
        <video 
          ref="cameraVideo"
          class="interviewee-overlay"
          autoplay
          muted
          playsinline
          :style="{ width: cameraWidth, height: cameraHeight }"
        ></video>
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
import {Mp3Encoder} from "lamejs";

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
      totalVideos: 5, // 根据实际视频数量修改
      videoSources: [
        '/videos/1.mp4',
        '/videos/2.mp4',
        '/videos/3.mp4',
        '/videos/4.mp4'
      ],
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
      ],
      cameraStream: null,
      cameraVideo: null,
      cameraWidth: '15%',
      cameraHeight: '20%'
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
    initCamera() {
      const constraints = { video: { width: 640, height: 480 } };
      
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          this.cameraStream = stream;
          this.cameraVideo = this.$refs.cameraVideo;
          this.cameraVideo.srcObject = stream;
          
          // 调整尺寸适配容器
          this.adjustCameraSize();
          window.addEventListener('resize', this.adjustCameraSize);
        })
        .catch(error => {
          console.error('摄像头权限获取失败:', error);
          // 处理权限拒绝情况，可添加提示
        });
    },

    stopCamera() {
      if (this.cameraStream) {
        this.cameraStream.getTracks().forEach(track => track.stop());
        this.cameraStream = null;
      }
      window.removeEventListener('resize', this.adjustCameraSize);
    },

    adjustCameraSize() {
      const container = this.$refs.videoArea;
      if (container) {
        this.cameraWidth = `${container.clientWidth * 0.15}px`; // 15%宽度
        this.cameraHeight = `${container.clientHeight * 0.2}px`; // 20%高度
      }
    },
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
      // 开始录音
      this.startAudioRecording();

      this.timer = setInterval(() => {
        this.duration++
        this.progress = (this.duration / 30) * 100
        if (this.duration >= 30) this.stopRecording()
      }, 1000)
    },
    stopRecording() {
      this.isRecording = false
      clearInterval(this.timer)
      // 停止录音
      this.stopAudioRecording();

      if (this.currentVideoIndex < this.totalVideos - 1) {
        this.currentVideoIndex++
      }
    },
    playVideo() {
      const video = this.$refs.videoPlayer
      video.play().catch(error => {
        console.error('视频播放失败:', error)
      })
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
    },
    toggleChat() {
      console.log('toggle')
      this.isChatExpanded = !this.isChatExpanded
    },
    async initAudioRecording() {
      try {
        // 请求麦克风权限
        this.audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true
          }
        });

        // 创建音频上下文
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        console.log('麦克风权限获取成功');
      } catch (error) {
        console.error('获取麦克风权限失败:', error);
        alert('无法访问麦克风，请检查权限设置');
      }
    },

    // 开始录音
    startAudioRecording() {
      if (!this.audioStream) {
        console.warn('音频流未初始化');
        return;
      }

      // 重置录音数据
      this.audioChunks = [];
      this.isAudioRecording = true;

      // 创建MediaRecorder实例
      this.mediaRecorder = new MediaRecorder(this.audioStream);

      // 数据可用时的处理
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      // 停止录音时的处理
      this.mediaRecorder.onstop = () => {
        this.processAudio();
      };

      // 开始录音
      this.mediaRecorder.start(1000); // 每1秒收集一次数据
      console.log('录音开始');
    },

    // 停止录音
    stopAudioRecording() {
      if (this.mediaRecorder && this.isAudioRecording) {
        this.mediaRecorder.stop();
        this.isAudioRecording = false;
        console.log('录音结束');
      }
    },

    // 处理音频数据并转换为MP3
    async processAudio() {
      try {
        // 合并音频数据
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });

        // 将Blob转换为ArrayBuffer
        const arrayBuffer = await audioBlob.arrayBuffer();

        // 解码音频数据
        const audioData = await this.audioContext.decodeAudioData(arrayBuffer);

        // 将PCM数据转换为MP3
        this.mp3Blob = this.encodeToMp3(audioData);

        console.log('MP3编码完成', this.mp3Blob);

        // 触发下载或上传
        this.handleAudioFile(this.mp3Blob);
      } catch (error) {
        console.error('音频处理失败:', error);
      }
    },

    // 将PCM数据编码为MP3
    encodeToMp3(audioData) {
      // 获取PCM数据
      const leftChannel = audioData.getChannelData(0);
      const sampleRate = audioData.sampleRate;

      // 初始化MP3编码器
      const mp3Encoder = new Mp3Encoder(1, sampleRate, 128); // 单声道, 128kbps

      // 编码配置
      const samplesPerBlock = 1152;
      const leftSamples = new Int16Array(samplesPerBlock);

      // 编码缓冲区
      let mp3Data = [];

      // 分块处理音频数据
      for (let i = 0; i < leftChannel.length; i += samplesPerBlock) {
        const block = leftChannel.subarray(i, i + samplesPerBlock);

        // 转换为16位整数
        for (let j = 0; j < block.length; j++) {
          leftSamples[j] = Math.max(-1, Math.min(1, block[j])) * 32767;
        }

        // 编码为MP3
        const mp3buf = mp3Encoder.encodeBuffer(leftSamples);
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }
      }

      // 完成编码
      const lastChunk = mp3Encoder.flush();
      if (lastChunk.length > 0) {
        mp3Data.push(lastChunk);
      }

      // 合并为Blob
      return new Blob(mp3Data, { type: 'audio/mp3' });
    },

    // 处理生成的MP3文件
    handleAudioFile(blob) {
      // 这里可以添加上传到服务器的逻辑
      console.log('生成的MP3文件', blob);

      // 示例：创建下载链接
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `interview-answer-${new Date().toISOString().slice(0, 19)}.mp3`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    },
  },
  mounted() {
    console.log('视频路径验证:', this.currentVideoSrc)
    this.initCamera()
    this.playVideo()

    // 初始化音频录制
    this.initAudioRecording()
  },
  beforeUnmount() {
    // 组件卸载时释放摄像头资源
    this.stopCamera()
    this.stopAudioRecording()

    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop())
    }
  },
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
  background: none; /* 移除背景图片 */
  border: 3px solid white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 3;
  transition: transform 0.3s ease;
  object-fit: cover; /* 保持视频比例 */
}

/* 悬停效果保留 */
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