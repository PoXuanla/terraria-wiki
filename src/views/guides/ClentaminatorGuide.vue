<script setup>
// 環境治理指南頁面
// 這是一個骨架頁面，實際內容可以在後續添加
</script>

<template>
  <div class="page-container">
    <article class="page-card">
      <header class="page-header page-header--green">
        <div class="page-header__icon">🌿</div>
        <div class="page-header__info">
          <h1 class="page-header__title">環境治理指南</h1>
          <p class="page-header__subtitle">Clentaminator Guide</p>
        </div>
      </header>
      
      <div class="page-content">
        <section class="content-section">
          <h2 class="section-title">概述</h2>
          <p class="section-text">
            環境淨化槍 (Clentaminator) 是一種強大的工具，
            可以快速改變大範圍的地形環境。本指南將介紹如何有效使用淨化槍治理腐化、猩紅和神聖環境。
          </p>
        </section>
        
        <section class="content-section">
          <h2 class="section-title">溶液類型</h2>
          <div class="placeholder-box">
            <span class="placeholder-icon">🧪</span>
            <span class="placeholder-text">內容待補充...</span>
          </div>
        </section>
        
        <section class="content-section">
          <h2 class="section-title">使用技巧</h2>
          <div class="placeholder-box">
            <span class="placeholder-icon">💡</span>
            <span class="placeholder-text">內容待補充...</span>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
}

.page-card {
  background-color: var(--color-bg-card);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-card, 0 4px 20px -4px rgba(0, 0, 0, 0.1));
  overflow: hidden;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  color: white;
}

.page-header--green {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
}

.page-header__icon {
  font-size: 2.5rem;
}

.page-header__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.page-header__subtitle {
  font-size: 0.875rem;
  opacity: 0.85;
  margin: 0.25rem 0 0;
}

.page-content {
  padding: 2rem;
}

.content-section {
  margin-bottom: 2rem;
}

.content-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #6ee7b7;
}

.section-text {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
}

.placeholder-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background-color: var(--color-bg-main);
  border-radius: 0.5rem;
  border: 2px dashed var(--color-border);
}

.placeholder-icon {
  font-size: 1.5rem;
}

.placeholder-text {
  color: var(--color-text-muted);
  font-style: italic;
}
</style>

