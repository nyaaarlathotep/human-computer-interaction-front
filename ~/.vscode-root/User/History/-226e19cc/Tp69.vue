<template>
  <div id="app">
    <h1 class="title">我的简历</h1>
    <div class="button-container">
      <router-link to="/upload" class="button">上传简历</router-link>
      <router-link to="/experience" class="button">直接体验</router-link>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.title {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
}

.button-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 100vh;
  gap: 20px;
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}
</style>    