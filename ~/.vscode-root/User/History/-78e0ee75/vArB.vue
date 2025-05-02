<template>
  <div>
    <h1>上传简历页面</h1>
    <el-upload
      class="upload-demo"
      action="#"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
    >
      <el-button size="large" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileList = ref([]);

const handleRemove = (file, fileList) => {
  console.log(file, fileList);
};

const handlePreview = (file) => {
  console.log(file);
};

const handleExceed = (files, fileList) => {
  window.$message.warning(`当前限制选择 3 个文件，你选择了 ${files.length + fileList.length} 个`);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    window.$message.error('只能上传 JPG/PNG 文件!');
  }
  const isLt500k = file.size / 1024 < 500;
  if (!isLt500k) {
    window.$message.error('文件大小不能超过 500KB!');
  }
  return isJpgOrPng && isLt500k;
};
</script>

<style scoped>
/* 可以在这里添加样式 */
</style>   