<script setup>
import { Hammer } from 'lucide-vue-next'

/**
 * WeaponSourceItem - 單一取得方式卡片
 * 
 * 根據 source.type 渲染不同的視覺樣式
 */

const props = defineProps({
  /** 取得方式資料 */
  source: {
    type: Object,
    required: true,
  },
  /** 成品資訊 */
  result: {
    type: Object,
    required: true,
    // { icon: string, name: string }
  },
})

// 根據 type 取得對應的樣式配置
const typeConfig = {
  crafting: { icon: '🔨', label: '製作配方', color: '#10b981' },
  drop: { icon: '💀', label: '怪物掉落', color: '#ef4444' },
  purchase: { icon: '🛒', label: 'NPC 購買', color: '#3b82f6' },
  chest: { icon: '📦', label: '寶箱獲得', color: '#f59e0b' },
  fishing: { icon: '🎣', label: '釣魚獲得', color: '#06b6d4' },
  event: { icon: '⚔️', label: '事件獎勵', color: '#8b5cf6' },
  bag: { icon: '🎁', label: '寶藏袋', color: '#f97316' },
  crate: { icon: '📦', label: '木箱獲得', color: '#eab308' },
  quest: { icon: '📜', label: '任務獎勵', color: '#14b8a6' },
  other: { icon: '⭐', label: '其他方式', color: '#6b7280' },
}

const config = typeConfig[props.source.type] || typeConfig.other
</script>

<template>
  <div 
    class="source-item" 
    :style="{ '--source-color': config.color }"
  >
    <!-- ==========================================
         Crafting - 製作配方
         ========================================== -->
    <template v-if="source.type === 'crafting'">
      <!-- 製作站標籤 -->
      <div class="source-item__tag">
        <Hammer :size="14" />
        <span>{{ source.station || '工作台' }}</span>
      </div>
      
      <!-- 配方公式 -->
      <div class="source-item__formula">
        <!-- 素材群 -->
        <div class="source-item__ingredients">
          <template v-for="(item, index) in source.recipe" :key="index">
            <div class="source-slot">
              <div class="source-slot__icon-wrapper">
                <img 
                  v-if="item.icon" 
                  :src="item.icon" 
                  :alt="item.name"
                  class="source-slot__icon"
                />
                <span class="source-slot__count">×{{ item.count }}</span>
              </div>
              <span class="source-slot__name">{{ item.name }}</span>
            </div>
            <!-- 加號分隔 -->
            <span v-if="index < source.recipe.length - 1" class="source-item__plus">+</span>
          </template>
        </div>
        
        <!-- 箭頭 -->
        <div class="source-item__arrow">→</div>
        
        <!-- 成品 -->
        <div class="source-slot source-slot--result">
          <div class="source-slot__icon-wrapper">
            <img 
              :src="result.icon" 
              :alt="result.name"
              class="source-slot__icon"
            />
          </div>
          <span class="source-slot__name">{{ result.name }}</span>
        </div>
      </div>
      
      <!-- 備註 -->
      <p v-if="source.note" class="source-item__note">
        💡 {{ source.note }}
      </p>
    </template>

    <!-- ==========================================
         Drop - 怪物掉落
         ========================================== -->
    <template v-else-if="source.type === 'drop'">
      <!-- 標籤 -->
      <div class="source-item__tag">
        <span>💀</span>
        <span>怪物掉落</span>
      </div>
      
      <!-- 掉落公式 -->
      <div class="source-item__formula">
        <!-- 怪物 -->
        <div class="source-slot source-slot--monster">
          <div class="source-slot__icon-wrapper">
            <img 
              v-if="source.dropFromIcon" 
              :src="source.dropFromIcon" 
              :alt="source.dropFrom"
              class="source-slot__icon"
            />
            <span v-else class="source-slot__emoji">👾</span>
          </div>
          <span class="source-slot__name">{{ source.dropFrom }}</span>
        </div>
        
        <!-- 箭頭 -->
        <div class="source-item__arrow">→</div>
        
        <!-- 掉落武器 -->
        <div class="source-slot source-slot--result">
          <!-- 機率泡泡 -->
          <div class="source-slot__bubble">{{ source.dropChance }}</div>
          <div class="source-slot__icon-wrapper">
            <img 
              :src="result.icon" 
              :alt="result.name"
              class="source-slot__icon"
            />
          </div>
          <span class="source-slot__name">{{ result.name }}</span>
        </div>
      </div>
      
      <!-- 備註 -->
      <p v-if="source.notes" class="source-item__note">
        💡 {{ source.notes }}
      </p>
    </template>

    <!-- ==========================================
         Purchase - NPC 購買
         ========================================== -->
    <template v-else-if="source.type === 'purchase'">
      <div class="source-item__tag">
        <span>🛒</span>
        <span>NPC 購買</span>
      </div>
      
      <div class="source-item__formula">
        <div class="source-slot source-slot--npc">
          <div class="source-slot__icon-wrapper">
            <img 
              v-if="source.npcIcon" 
              :src="source.npcIcon" 
              :alt="source.npc"
              class="source-slot__icon"
            />
            <span v-else class="source-slot__emoji">🧑‍🌾</span>
          </div>
          <span class="source-slot__name">{{ source.npc }}</span>
        </div>
        
        <div class="source-item__arrow">→</div>
        
        <div class="source-slot source-slot--result">
          <div class="source-slot__icon-wrapper">
            <img :src="result.icon" :alt="result.name" class="source-slot__icon" />
            <span class="source-slot__price">{{ source.price }}</span>
          </div>
          <span class="source-slot__name">{{ result.name }}</span>
        </div>
      </div>
      
      <p v-if="source.condition" class="source-item__condition">
        ⚠️ {{ source.condition }}
      </p>
      <p v-if="source.notes" class="source-item__note">
        💡 {{ source.notes }}
      </p>
    </template>

    <!-- ==========================================
         Chest - 寶箱獲得
         ========================================== -->
    <template v-else-if="source.type === 'chest'">
      <div class="source-item__tag">
        <span>📦</span>
        <span>寶箱獲得</span>
      </div>
      
      <div class="source-item__formula">
        <div class="source-slot source-slot--chest">
          <div class="source-slot__icon-wrapper">
            <img 
              v-if="source.chestIcon" 
              :src="source.chestIcon" 
              :alt="source.chestType"
              class="source-slot__icon"
            />
            <span v-else class="source-slot__emoji">📦</span>
          </div>
          <span class="source-slot__name">{{ source.chestType }}</span>
        </div>
        
        <div class="source-item__arrow">→</div>
        
        <div class="source-slot source-slot--result">
          <div class="source-slot__icon-wrapper">
            <img :src="result.icon" :alt="result.name" class="source-slot__icon" />
          </div>
          <span class="source-slot__name">{{ result.name }}</span>
        </div>
      </div>
      
      <p v-if="source.location" class="source-item__location">
        📍 {{ source.location }}
      </p>
      <p v-if="source.notes" class="source-item__note">
        💡 {{ source.notes }}
      </p>
    </template>

    <!-- ==========================================
         Event - 事件獎勵
         ========================================== -->
    <template v-else-if="source.type === 'event'">
      <div class="source-item__tag">
        <span>⚔️</span>
        <span>事件獎勵</span>
      </div>
      
      <div class="source-item__formula">
        <div class="source-slot source-slot--event">
          <div class="source-slot__icon-wrapper">
            <img 
              v-if="source.eventIcon" 
              :src="source.eventIcon" 
              :alt="source.eventName"
              class="source-slot__icon"
            />
            <span v-else class="source-slot__emoji">⚔️</span>
          </div>
          <span class="source-slot__name">{{ source.eventName }}</span>
        </div>
        
        <div class="source-item__arrow">→</div>
        
        <div class="source-slot source-slot--result">
          <!-- 機率泡泡 -->
          <div v-if="source.dropChance" class="source-slot__bubble">{{ source.dropChance }}</div>
          <div class="source-slot__icon-wrapper">
            <img :src="result.icon" :alt="result.name" class="source-slot__icon" />
          </div>
          <span class="source-slot__name">{{ result.name }}</span>
        </div>
      </div>
      
      <p v-if="source.dropFrom" class="source-item__from">
        👾 掉落自：{{ source.dropFrom }}
      </p>
      <p v-if="source.notes" class="source-item__note">
        💡 {{ source.notes }}
      </p>
    </template>

    <!-- ==========================================
         Other / Fallback - 其他方式
         ========================================== -->
    <template v-else>
      <div class="source-item__tag">
        <span>{{ config.icon }}</span>
        <span>{{ config.label }}</span>
      </div>
      
      <div class="source-item__description">
        <p>{{ source.description || '特殊取得方式' }}</p>
      </div>
      
      <p v-if="source.notes" class="source-item__note">
        💡 {{ source.notes }}
      </p>
    </template>
  </div>
</template>

<style scoped>
/* ==========================================
   Source Item - 基礎容器
   ========================================== */
.source-item {
  padding: 1rem;
  background: var(--color-bg-main);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--source-color, #6b7280);
}

/* ==========================================
   標籤
   ========================================== */
.source-item__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  background: color-mix(in srgb, var(--source-color) 10%, transparent);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--source-color);
  margin-bottom: 0.875rem;
}

/* ==========================================
   公式佈局
   ========================================== */
.source-item__formula {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.source-item__ingredients {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.source-item__plus {
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--color-text-muted);
  opacity: 0.5;
}

.source-item__arrow {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--color-text-muted);
  opacity: 0.6;
}

/* ==========================================
   插槽樣式
   ========================================== */
.source-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  min-width: 64px;
  transition: all 0.2s ease;
}

.source-slot:hover {
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1);
}

.source-slot--result {
  background: linear-gradient(135deg, color-mix(in srgb, var(--source-color) 10%, transparent) 0%, color-mix(in srgb, var(--source-color) 5%, transparent) 100%);
  border-color: var(--source-color);
}

.source-slot--monster {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(249, 115, 22, 0.05) 100%);
  border-color: rgba(239, 68, 68, 0.3);
}

.source-slot--npc {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%);
  border-color: rgba(59, 130, 246, 0.3);
}

.source-slot--chest {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(234, 179, 8, 0.05) 100%);
  border-color: rgba(245, 158, 11, 0.3);
}

.source-slot--event {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-color: rgba(139, 92, 246, 0.3);
}

.source-slot__icon-wrapper {
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.source-slot__icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;
}

.source-slot__emoji {
  font-size: 1.5rem;
}

.source-slot__count {
  position: absolute;
  bottom: -4px;
  right: -8px;
  padding: 0.125rem 0.375rem;
  background: var(--color-primary);
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  border-radius: 9999px;
  line-height: 1;
}

/* 機率泡泡 - 訊息泡泡樣式 */
.source-slot__bubble {
  position: relative;
  padding: 0.25rem 0.5rem;
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  font-size: 0.6875rem;
  font-weight: 700;
  border-radius: 0.375rem;
  line-height: 1;
  white-space: nowrap;
  margin-bottom: 0.25rem;
  box-shadow: 0 2px 4px -1px rgba(245, 158, 11, 0.3);
}

/* 泡泡底部三角形 */
.source-slot__bubble::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #f97316;
}

.source-slot__price {
  position: absolute;
  bottom: -6px;
  right: -12px;
  padding: 0.125rem 0.375rem;
  background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
  color: white;
  font-size: 0.5625rem;
  font-weight: 700;
  border-radius: 9999px;
  line-height: 1;
  white-space: nowrap;
}

.source-slot__name {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-align: center;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ==========================================
   備註與說明
   ========================================== */
.source-item__note,
.source-item__condition,
.source-item__location,
.source-item__from {
  margin: 0.875rem 0 0;
  padding: 0.5rem 0.75rem;
  background: #eff6ff;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  color: #1e40af;
}

:global(.dark) .source-item__note,
:global(.dark) .source-item__condition,
:global(.dark) .source-item__location,
:global(.dark) .source-item__from {
  background: rgba(59, 130, 246, 0.1);
  color: #93c5fd;
}

.source-item__condition {
  background: #fef3c7;
  color: #92400e;
}

:global(.dark) .source-item__condition {
  background: rgba(245, 158, 11, 0.1);
  color: #fcd34d;
}

.source-item__description {
  padding: 0.75rem;
  background: var(--color-bg-card);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.source-item__description p {
  margin: 0;
}

/* ==========================================
   響應式
   ========================================== */
@media (max-width: 640px) {
  .source-item__formula {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .source-item__arrow {
    transform: rotate(90deg);
    margin: 0.25rem 0 0.25rem 2rem;
  }
}
</style>

