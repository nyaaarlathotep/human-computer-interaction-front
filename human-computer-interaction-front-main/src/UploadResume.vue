<template>
  <div class="container">
    <!-- 标题 -->
    <h1 class="title">我的简历</h1>

    <!-- 表单容器 -->
    <div class="form-container">
      <!-- 面试岗位 -->
      <div class="form-group">
        <label>面试岗位：</label>
        <input 
          type="text" 
          v-model="formData.position"
          placeholder="请输入目标岗位名称"
          class="input-field"
        >
      </div>

      <!-- 上传简历 -->
      <div class="form-group">
        <label>上传简历文件：</label>
        <div class="upload-wrapper">
          <input 
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            class="file-input"
            accept=".pdf,.doc,.docx"
          >
          <button 
            @click="triggerFileInput"
            class="upload-btn"
          >
            {{ fileName || '选择文件（支持PDF/Word）' }}
          </button>
        </div>
      </div>

      <!-- 技术栈输入 -->
      <div class="form-group">
        <label>面试技术栈：</label>
        <textarea
          v-model="formData.techStack"
          placeholder="请输入要求的技术栈（如：Java, SpringBoot, redis, Mysql, Vue 等 ）"
          class="textarea-field"
          rows="3"
        ></textarea>
      </div>

      <!-- 项目要求 -->
      <div class="form-group">
        <label>面试项目：</label>
        <textarea
          v-model="formData.projectRequirement"
          placeholder="请输入项目相关要求"
          class="textarea-field"
          rows="3"
        ></textarea>
      </div>

      <!-- 其他要求 -->
      <div class="form-group">
        <label>其他面试要求：</label>
        <textarea
          v-model="formData.otherRequirement"
          placeholder="请输入其他对于面试官的要求，如：面试官需要严肃一点，施加更多压力，或者多一些引导，增加提问细节"
          class="textarea-field"
          rows="3"
        ></textarea>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button 
          class="submit-btn"
          @click="handleSubmit"
        >
          提交简历
        </button>
        <button 
          class="draft-btn"
          @click="saveDraft"
        >
          保存草稿
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        position: '',
        techStack: '',
        projectRequirement: '',
        otherRequirement: ''
      },
      fileName: '',
      resumeFile: null
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.fileName = file.name
        this.resumeFile = file
      }
    },
    handleSubmit() {
      // 这里添加提交逻辑
      console.log('提交数据:', this.formData)
      console.log('上传文件:', this.resumeFile)
      alert('简历提交成功！')
      this.$router.push('/interview')
    },
    saveDraft() {
      // 这里添加保存草稿逻辑
      localStorage.setItem('resumeDraft', JSON.stringify(this.formData))
      alert('草稿保存成功！')
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  position: relative;
  padding: 20px;
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

.form-container {
  max-width: 800px;
  margin: 80px auto 0;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #34495e;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 2px solid #bdc3c7;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #3498db;
  outline: none;
}

.upload-wrapper {
  position: relative;
}

.file-input {
  display: none;
}

.upload-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.upload-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.textarea-field {
  width: 100%;
  padding: 12px;
  border: 2px solid #bdc3c7;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.submit-btn, .draft-btn {
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
}

.draft-btn {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  color: white;
}

.submit-btn:hover, .draft-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .title {
    font-size: 24px;
    top: 20px;
    left: 20px;
  }

  .form-container {
    margin-top: 60px;
    padding: 20px;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>