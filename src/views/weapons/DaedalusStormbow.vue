<script setup>
// 代達羅斯風暴弓頁面
// 這是一個骨架頁面，實際內容可以在後續添加
</script>

<template>
  <div class="page-container">
    <article class="page-card">
      <header class="page-header page-header--purple">
        <div class="page-header__icon">🏹</div>
        <div class="page-header__info">
          <h1 class="page-header__title">代達羅斯風暴弓</h1>
          <p class="page-header__subtitle">Daedalus Stormbow</p>
        </div>
      </header>
      
      <div class="page-content">
        <section class="content-section">
          <h2 class="section-title">概述</h2>
          <p class="section-text">
            代達羅斯風暴弓是一把強大的困難模式弓箭，
            射出的箭矢會從天空降落。搭配聖箭使用時效果極佳，是對付機械Boss的神器。
          </p>
        </section>
        
        <section class="content-section">
          <h2 class="section-title">屬性數據</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">傷害</span>
              <span class="stat-value">43</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">暴擊率</span>
              <span class="stat-value">4%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">使用速度</span>
              <span class="stat-value">19 (很快)</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">擊退</span>
              <span class="stat-value">2.25 (非常弱)</span>
            </div>
          </div>
        </section>
        
        <section class="content-section">
          <h2 class="section-title">取得方式</h2>
          <div class="placeholder-box">
            <span class="placeholder-icon">📦</span>
            <span class="placeholder-text">從神聖寶藏怪掉落 (1/4 機率)</span>
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

.page-header--purple {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
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
  border-bottom: 2px solid #c4b5fd;
}

.section-text {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: var(--color-bg-main);
  border-radius: 0.5rem;
  border-left: 3px solid #a855f7;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
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
  color: var(--color-text-secondary);
}
</style>

