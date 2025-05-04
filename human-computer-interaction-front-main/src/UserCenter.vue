<template>
  <div class="dashboard">
    <!-- 简历管理板块 -->
    <section class="resume-section">
      <h2>我的简历</h2>
      <div class="resume-grid">
        <div
            v-for="resume in resumes"
            :key="resume.id"
            class="resume-card"
            :class="{ active: resume.isActive }"
            @click="setActiveResume(resume.id)"
        >
          <div class="card-header">
            <h3>{{ resume.title }}</h3>
            <span class="status-badge" v-if="resume.isActive">生效中</span>
          </div>
          <p class="update-time">最后更新：{{ resume.updatedAt }}</p>
          <div class="preview">{{ resume.contentPreview }}</div>
        </div>
      </div>
    </section>

    <!-- 面试记录板块 -->
    <section class="interview-section">
      <h2>面试记录</h2>
      <table class="record-table">
        <thead>
        <tr>
          <th>面试时间</th>
          <th>面试时长</th>
          <th>面试记录</th>
          <th>面试状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="record in interviewRecords" :key="record.id">
          <td>{{ record.time }}</td>
          <td>{{ record.duration }} 分钟</td>
          <td>
            <a :href="record.detailLink" class="record-link">
              查看详情 <i class="icon-link"></i>
            </a>
          </td>
          <td>
            <span class="status" :class="record.status">{{ record.status }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resumes: [
        {
          id: 1,
          title: "高级前端工程师简历",
          contentPreview: "5年全栈开发经验，精通Vue生态...",
          updatedAt: "2024-02-15",
          isActive: true
        },
        {
          id: 2,
          title: "技术主管简历",
          contentPreview: "团队管理经验，10人技术团队...",
          updatedAt: "2023-12-01",
          isActive: false
        }
      ],
      interviewRecords: [
        {
          id: 1001,
          time: "2024-03-10 14:30",
          duration: 45,
          detailLink: "/interviews/1001",
          status: "已完成"
        },
        {
          id: 1002,
          time: "2024-03-15 10:00",
          duration: 30,
          detailLink: "/interviews/1002",
          status: "进行中"
        }
      ]
    }
  },
  methods: {
    setActiveResume(resumeId) {
      this.resumes = this.resumes.map(resume => ({
        ...resume,
        isActive: resume.id === resumeId
      }))
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

/* 简历板块样式 */
.resume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.resume-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.resume-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.resume-card.active {
  border-color: #3498db;
  background: #f8f9ff;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status-badge {
  background: #27ae60;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.9rem;
}

.update-time {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.preview {
  color: #34495e;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 面试记录表格样式 */
.record-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

th, td {
  padding: 1rem;
  text-align: left;
}

thead {
  background: #3498db;
  color: white;
}

tbody tr:nth-child(even) {
  background: #f8f9fa;
}

.record-link {
  color: #3498db;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.record-link:hover {
  text-decoration: underline;
}

.icon-link {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%233498db" d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"/></svg>');
  margin-left: 0.5rem;
}

.status {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.9rem;
}

.status.已完成 {
  background: #27ae60;
  color: white;
}

.status.进行中 {
  background: #f1c40f;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .resume-grid {
    grid-template-columns: 1fr;
  }

  th, td {
    padding: 0.8rem;
  }
}
</style>