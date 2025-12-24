<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found">
    <div class="not-found__content">
      <div class="not-found__icon">🔍</div>
      <h1 class="not-found__title">404</h1>
      <p class="not-found__message">抱歉，找不到您要的頁面</p>
      <button class="not-found__button" @click="goHome">
        返回首頁
      </button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-main);
}

.not-found__content {
  text-align: center;
  padding: 2rem;
}

.not-found__icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.not-found__title {
  font-size: 6rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
  line-height: 1;
}

.not-found__message {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin: 1rem 0 2rem;
}

.not-found__button {
  padding: 0.75rem 2rem;
  background-color: var(--color-primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: background-color var(--transition-fast);
}

.not-found__button:hover {
  background-color: var(--color-primary-hover);
}
</style>

