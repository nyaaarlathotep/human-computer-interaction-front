<template>
  <div class="report-container">
    <!-- 标题栏 -->
    <header class="report-header">
      <h1>面试报告</h1>
      <button class="download-btn" @click="downloadPDF">
        <i class="icon-download"></i> 下载PDF
      </button>
    </header>

    <!-- 报告主体 -->
    <main class="report-content">
      <!-- 问题分析 -->
      <section class="analysis-section">
        <h2 class="section-title">问题分析</h2>
        <div class="question-list">
          <div v-for="(item, index) in questions" :key="index" class="question-item">
            <div class="question-header">
              <span class="question-index">{{ index + 1 }}.</span>
              <h3 class="question-text">{{ item.question }}</h3>
            </div>
            <div class="suggestion-box">
              <div class="suggestion-item">
                <span class="tag improvement">改进建议</span>
                <p>{{ item.suggestion }}</p>
              </div>
              <div class="suggestion-item">
                <span class="tag example">参考回答</span>
                <p>{{ item.example }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 面试建议 -->
      <section class="advice-section">
        <h2 class="section-title">面试过程建议</h2>
        <ul class="advice-list">
          <li v-for="(advice, index) in interviewAdvice" :key="index" class="advice-item">
            {{ advice }}
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          question: "请说明你在项目中承担的主要角色",
          suggestion: "建议更具体描述个人贡献，使用量化指标说明成果",
          example: "作为后端负责人，我设计了分布式架构方案，带领3人小组完成核心模块开发，系统QPS从500提升至3000"
        },
        {
          question: "如何处理团队意见分歧",
          suggestion: "可补充具体案例说明冲突解决过程",
          example: "在产品方案讨论中，我通过用户调研数据支持方案A，最终团队达成共识，该方案上线后转化率提升15%"
        }
      ],
      interviewAdvice: [
        "注意控制回答时长，重点突出关键成就",
        "技术问题回答时可结合白板图示说明",
        "适当增加与面试官的眼神交流",
        "遇到压力问题保持语速平稳"
      ]
    }
  },
  methods: {
    downloadPDF() {
      // PDF生成逻辑
      console.log("生成PDF文档...")
    }
  }
}
</script>

<style scoped>
.report-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}

.download-btn {
  padding: 0.8rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.download-btn:hover {
  background: #2980b9;
}

.section-title {
  color: #34495e;
  padding-left: 1rem;
  border-left: 4px solid #3498db;
  margin: 2rem 0;
}

.question-item {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.question-header {
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
}

.question-index {
  font-size: 1.5rem;
  color: #3498db;
  margin-right: 1rem;
}

.question-text {
  font-size: 1.1rem;
  color: #2c3e50;
}

.suggestion-box {
  margin-left: 2.5rem;
}

.suggestion-item {
  margin: 1rem 0;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.tag {
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.improvement {
  background: #f1c40f;
  color: #2c3e50;
}

.example {
  background: #2ecc71;
  color: white;
}

.advice-list {
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.advice-item {
  margin: 1rem 0;
  padding: 0.8rem;
  position: relative;
  padding-left: 1.5rem;
}

.advice-item::before {
  content: "•";
  color: #3498db;
  position: absolute;
  left: 0;
}
</style>