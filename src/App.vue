<script setup>
// Terraria Wiki - 主應用程式入口
// 使用 RouterView 渲染路由對應的組件
</script>

<template>
  <div class="app-wrapper bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
    <RouterView />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
}
</style>
