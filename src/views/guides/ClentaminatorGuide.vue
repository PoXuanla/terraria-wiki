<script setup>
import { 
  AlertTriangle, 
  Shield, 
  Droplets,
  TreePine,
  Skull,
  Sparkles,
  Coins,
  User,
  Zap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Info,
  Target,
  Layers,
  BookOpen
} from 'lucide-vue-next'
import DocLayout from '@/layouts/DocLayout.vue'
import BaseIcon from '@/components/BaseIcon.vue'

/**
 * 侵蝕性生物群系資料
 */
const biomeThreats = [
  {
    id: 'corruption',
    name: '腐化之地',
    nameEn: 'Corruption',
    icon: 'https://terraria.wiki.gg/images/f/f7/Ebonstone_Block.png',
    colors: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      text: 'text-purple-900',
      accent: '#7c3aed',
      gradient: 'from-purple-600 to-violet-500',
    },
    spreadRate: '快速',
    affectedBlocks: ['石塊', '沙塊', '冰塊', '草地'],
    description: '產生惡魔祭壇和暗影珠，是世界的「原生」邪惡。',
    danger: '會將叢林淤泥轉化為泥土，永久破壞叢林。',
  },
  {
    id: 'crimson',
    name: '猩紅之地',
    nameEn: 'Crimson',
    icon: 'https://terraria.wiki.gg/images/a/a8/Crimstone_Block.png',
    colors: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-900',
      accent: '#dc2626',
      gradient: 'from-red-600 to-rose-500',
    },
    spreadRate: '快速',
    affectedBlocks: ['石塊', '沙塊', '冰塊', '草地'],
    description: '產生猩紅祭壇和猩紅心臟，是腐化的替代版本。',
    danger: '同樣會將叢林淤泥轉化為泥土，威脅等同腐化。',
  },
  {
    id: 'hallow',
    name: '神聖之地',
    nameEn: 'The Hallow',
    icon: 'https://terraria.wiki.gg/images/d/d1/Pearlstone_Block.png',
    colors: {
      bg: 'bg-pink-50',
      border: 'border-pink-300',
      text: 'text-pink-900',
      accent: '#ec4899',
      gradient: 'from-pink-500 to-rose-400',
    },
    spreadRate: '快速',
    affectedBlocks: ['石塊', '沙塊', '冰塊', '草地'],
    description: '困難模式開始時自動生成，是「正義的邪惡」。',
    danger: '不會侵蝕叢林！可作為緩衝區使用。',
    isProtective: true,
  },
]

/**
 * 擴散機制說明
 */
const spreadMechanics = [
  {
    block: '草地',
    blockEn: 'Grass',
    icon: 'https://terraria.wiki.gg/images/f/f7/Grass_Block.png',
    canSpread: true,
    note: '會轉化為對應的邪惡/神聖草地',
  },
  {
    block: '石塊',
    blockEn: 'Stone',
    icon: 'https://terraria.wiki.gg/images/c/c8/Stone_Block.png',
    canSpread: true,
    note: '轉化為黑檀石/猩紅石/珍珠石',
  },
  {
    block: '沙塊',
    blockEn: 'Sand',
    icon: 'https://terraria.wiki.gg/images/7/79/Sand_Block.png',
    canSpread: true,
    note: '轉化為黑檀沙/猩紅沙/珍珠沙',
  },
  {
    block: '冰塊',
    blockEn: 'Ice',
    icon: 'https://terraria.wiki.gg/images/d/d6/Ice_Block.png',
    canSpread: true,
    note: '轉化為紫冰/紅冰/粉冰',
  },
  {
    block: '淤泥',
    blockEn: 'Mud',
    icon: 'https://terraria.wiki.gg/images/d/d5/Mud_Block.png',
    canSpread: false,
    note: '不會直接轉化，但會被轉成泥土後再被侵蝕',
    critical: true,
  },
]

/**
 * 早期解決方案
 */
const earlySolutions = [
  {
    id: 'sunflower',
    name: '太陽花',
    nameEn: 'Sunflower',
    icon: 'https://terraria.wiki.gg/images/5/5a/Sunflower_%28placed%29.gif',
    effect: '阻止腐化/猩紅從地表草地擴散',
    limitation: '僅對表面草地有效，無法阻止地下擴散',
  },
  {
    id: 'holy-water',
    name: '聖水',
    nameEn: 'Holy Water',
    icon: 'https://terraria.wiki.gg/images/3/3b/Holy_Water.png',
    effect: '將區域轉化為神聖之地',
    limitation: '範圍小，主要用於建立緩衝區',
  },
  {
    id: 'hellevator',
    name: '隔離帶 (地獄電梯)',
    nameEn: 'Hellevator',
    icon: '🕳️',
    isEmoji: true,
    effect: '挖掘 4 格寬的垂直通道，物理隔離區域',
    limitation: '需要大量時間挖掘，且刺藤可能跨越',
  },
  {
    id: 'purification-powder',
    name: '淨化粉',
    nameEn: 'Purification Powder',
    icon: 'https://terraria.wiki.gg/images/8/8b/Purification_Powder.png',
    effect: '將腐化/猩紅方塊恢復為正常',
    limitation: '範圍極小，僅適合小規模清理',
  },
]

/**
 * 環境改造槍資料
 */
const clentaminatorData = {
  name: '環境改造槍',
  nameEn: 'Clentaminator',
  icon: 'https://terraria.wiki.gg/images/9/9b/Clentaminator.png',
  price: '2 白金幣',
  priceIcon: 'https://terraria.wiki.gg/images/4/44/Platinum_Coin.png',
  seller: {
    name: '蒸汽龐克人',
    nameEn: 'Steampunker',
    icon: 'https://terraria.wiki.gg/images/0/0f/Steampunker.png',
    condition: '擊敗任一機械 Boss 後入住',
  },
  stats: {
    range: '約 60 格',
    penetration: '可穿透方塊',
    speed: '極快噴灑速度',
  },
  solutions: [
    {
      name: '綠色溶液',
      nameEn: 'Green Solution',
      icon: 'https://terraria.wiki.gg/images/d/db/Green_Solution.png',
      effect: '將區域恢復為純淨森林',
      price: '25 銀幣/個',
      recommended: true,
    },
    {
      name: '藍色溶液',
      nameEn: 'Blue Solution',
      icon: 'https://terraria.wiki.gg/images/0/0f/Blue_Solution.png',
      effect: '將區域轉化為神聖之地',
      price: '25 銀幣/個',
    },
    {
      name: '紫色溶液',
      nameEn: 'Purple Solution',
      icon: 'https://terraria.wiki.gg/images/6/6b/Purple_Solution.png',
      effect: '將區域轉化為腐化之地',
      price: '25 銀幣/個',
    },
    {
      name: '紅色溶液',
      nameEn: 'Red Solution',
      icon: 'https://terraria.wiki.gg/images/4/48/Red_Solution.png',
      effect: '將區域轉化為猩紅之地',
      price: '25 銀幣/個',
    },
  ],
}

/**
 * 操作提示
 */
const operationTips = [
  { icon: Target, text: '噴灑範圍約 60 格，建議從高處向下噴灑' },
  { icon: Layers, text: '可穿透方塊，適合清理地下大範圍區域' },
  { icon: Droplets, text: '搭配重力藥水 (Gravitation Potion) 效率最高' },
  { icon: Coins, text: '溶液消耗大，建議準備 3-5 組 (約 40 金幣)' },
]
</script>

<template>
  <DocLayout title="本頁目錄">
    <!-- ========================================
         Hero Banner (不被 prose 影響)
         ======================================== -->
    <header class="not-prose hero-banner">
      <div class="hero-banner__bg"></div>
      <div class="hero-banner__content">
        <div class="hero-banner__icon">
          <BaseIcon 
            icon="https://terraria.wiki.gg/images/9/9b/Clentaminator.png" 
            :size="72" 
          />
        </div>
        <div class="hero-banner__text">
          <div class="hero-banner__badge">
            <BookOpen :size="14" />
            <span>攻略指南</span>
          </div>
          <h1 class="hero-banner__title">環境治理指南</h1>
          <p class="hero-banner__subtitle">Biome Control & Clentaminator Guide</p>
          <p class="hero-banner__desc">
            掌握生物群系擴散機制，保護你的世界免受腐化與猩紅的侵蝕！
          </p>
        </div>
      </div>
    </header>

    <!-- 簡介段落 -->
    <p>
      在困難模式開啟後，<strong>腐化之地</strong>、<strong>猩紅之地</strong>和<strong>神聖之地</strong>會加速擴散，
      威脅你辛苦建立的世界。本指南將幫助你了解侵蝕機制、早期對策，以及終極解決方案——<em>環境改造槍</em>。
    </p>

    <!-- ========================================
         Section 1: 侵蝕機制
         ======================================== -->
    <h2 id="erosion">侵蝕機制</h2>
    
    <p>
      了解三種侵蝕性生物群系的特性是治理的第一步。
      每種都有獨特的外觀和行為，但擴散方式相似。
    </p>

    <!-- 生物群系卡片網格 (不被 prose 影響) -->
    <div class="not-prose biome-grid">
      <article 
        v-for="biome in biomeThreats" 
        :key="biome.id"
        :class="['biome-card', biome.colors.bg, biome.colors.border]"
      >
        <div class="biome-card__header">
          <BaseIcon :icon="biome.icon" :size="40" class="biome-card__icon" />
          <div class="biome-card__title-group">
            <h3 :class="['biome-card__name', biome.colors.text]">{{ biome.name }}</h3>
            <span class="biome-card__name-en">{{ biome.nameEn }}</span>
          </div>
          <span 
            v-if="biome.isProtective"
            class="biome-card__badge biome-card__badge--safe"
          >
            <Shield :size="12" />
            安全
          </span>
        </div>
        
        <p :class="['biome-card__desc', biome.colors.text]">
          {{ biome.description }}
        </p>
        
        <div class="biome-card__spread">
          <span class="biome-card__label">擴散速度</span>
          <span class="biome-card__value">{{ biome.spreadRate }}</span>
        </div>
        
        <div class="biome-card__blocks">
          <span class="biome-card__label">影響方塊</span>
          <div class="biome-card__tags">
            <span 
              v-for="block in biome.affectedBlocks" 
              :key="block"
              class="biome-card__tag"
            >{{ block }}</span>
          </div>
        </div>
        
        <div 
          :class="[
            'biome-card__danger',
            biome.isProtective ? 'biome-card__danger--safe' : 'biome-card__danger--warning'
          ]"
        >
          <CheckCircle2 v-if="biome.isProtective" :size="16" />
          <AlertTriangle v-else :size="16" />
          <span>{{ biome.danger }}</span>
        </div>
      </article>
    </div>

    <!-- 方塊擴散機制表 -->
    <h3>方塊擴散一覽</h3>
    <p>不同類型的方塊對侵蝕的反應不同，以下是詳細對照表：</p>

    <div class="not-prose spread-table">
      <div class="spread-table__header">
        <span>方塊類型</span>
        <span>可被侵蝕</span>
        <span>備註</span>
      </div>
      <div 
        v-for="block in spreadMechanics" 
        :key="block.blockEn"
        :class="['spread-table__row', { 'spread-table__row--critical': block.critical }]"
      >
        <div class="spread-table__cell spread-table__cell--block">
          <BaseIcon :icon="block.icon" :size="24" />
          <div class="spread-table__block-info">
            <span class="spread-table__block-name">{{ block.block }}</span>
            <span class="spread-table__block-en">{{ block.blockEn }}</span>
          </div>
        </div>
        <div class="spread-table__cell spread-table__cell--status">
          <CheckCircle2 
            v-if="block.canSpread" 
            :size="20" 
            class="spread-table__icon--yes" 
          />
          <XCircle 
            v-else 
            :size="20" 
            class="spread-table__icon--no" 
          />
        </div>
        <div class="spread-table__cell spread-table__cell--note">
          {{ block.note }}
        </div>
      </div>
    </div>

    <!-- ========================================
         Section 2: 緊急警告：叢林
         ======================================== -->
    <h2 id="jungle-warning">緊急警告：叢林</h2>

    <!-- 叢林危機警告區塊 (不被 prose 影響) -->
    <div class="not-prose jungle-alert">
      <div class="jungle-alert__header">
        <div class="jungle-alert__icon-wrapper">
          <BaseIcon 
            icon="https://terraria.wiki.gg/images/5/52/Jungle_Spores.png" 
            :size="48" 
          />
        </div>
        <div class="jungle-alert__title-group">
          <span class="jungle-alert__badge">
            <AlertTriangle :size="14" />
            緊急警告
          </span>
          <h3 class="jungle-alert__title">叢林危機：不可逆的破壞</h3>
        </div>
      </div>
      
      <div class="jungle-alert__content">
        <div class="jungle-alert__main">
          <h4 class="jungle-alert__subtitle">
            <TreePine :size="18" />
            為什麼必須保護叢林？
          </h4>
          <p class="jungle-alert__text">
            叢林是由<strong>淤泥 (Mud)</strong> 構成的。當腐化或猩紅侵蝕到叢林邊緣時：
          </p>
          <div class="jungle-alert__formula">
            <div class="formula-step">
              <BaseIcon 
                icon="https://terraria.wiki.gg/images/d/d5/Mud_Block.png" 
                :size="32" 
              />
              <span>淤泥</span>
            </div>
            <ArrowRight :size="24" class="formula-arrow" />
            <div class="formula-step">
              <BaseIcon 
                icon="https://terraria.wiki.gg/images/1/10/Dirt_Block.png" 
                :size="32" 
              />
              <span>泥土</span>
            </div>
            <ArrowRight :size="24" class="formula-arrow" />
            <div class="formula-step formula-step--danger">
              <BaseIcon 
                icon="https://terraria.wiki.gg/images/f/f7/Ebonstone_Block.png" 
                :size="32" 
              />
              <span>邪惡方塊</span>
            </div>
          </div>
          <p class="jungle-alert__text jungle-alert__text--emphasis">
            ⚠️ <strong>淤泥 → 泥土 的轉化是不可逆的！</strong>
            即使你用綠色溶液淨化，泥土也不會變回淤泥。
          </p>
        </div>
        
        <div class="jungle-alert__consequence">
          <h4 class="jungle-alert__consequence-title">後果</h4>
          <ul class="jungle-alert__list">
            <li>
              <XCircle :size="16" class="list-icon--danger" />
              <span>叢林面積永久縮小</span>
            </li>
            <li>
              <XCircle :size="16" class="list-icon--danger" />
              <span>無法刷叢林特有資源</span>
            </li>
            <li>
              <XCircle :size="16" class="list-icon--danger" />
              <span>可能無法召喚世紀之花</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="jungle-alert__solution">
        <Info :size="18" />
        <p>
          <strong>解決方案：</strong>在叢林周圍建立 <em>神聖之地緩衝區</em>。
          神聖之地不會侵蝕淤泥，可以有效阻擋腐化/猩紅的推進。
        </p>
      </div>
    </div>

    <!-- ========================================
         Section 3: 早期對策
         ======================================== -->
    <h2 id="early-solutions">早期對策</h2>
    
    <p>
      在取得環境改造槍之前，可以使用這些方法減緩擴散速度，爭取時間。
    </p>

    <!-- 早期解決方案卡片 (不被 prose 影響) -->
    <div class="not-prose solutions-grid">
      <div 
        v-for="solution in earlySolutions" 
        :key="solution.id"
        class="solution-card"
      >
        <div class="solution-card__header">
          <div v-if="solution.isEmoji" class="solution-card__emoji">
            {{ solution.icon }}
          </div>
          <BaseIcon 
            v-else
            :icon="solution.icon" 
            :size="36" 
            class="solution-card__icon"
          />
          <div class="solution-card__title">
            <span class="solution-card__name">{{ solution.name }}</span>
            <span class="solution-card__name-en">{{ solution.nameEn }}</span>
          </div>
        </div>
        
        <div class="solution-card__content">
          <div class="solution-card__effect">
            <CheckCircle2 :size="14" class="solution-card__effect-icon" />
            <span>{{ solution.effect }}</span>
          </div>
          <div class="solution-card__limitation">
            <AlertTriangle :size="14" class="solution-card__limit-icon" />
            <span>{{ solution.limitation }}</span>
          </div>
        </div>
      </div>
    </div>

    <blockquote>
      <strong>💡 專家提示：</strong>擊敗肉山後，立即在叢林邊界挖掘 4 格寬的隔離帶。
      這能為你爭取足夠的時間來準備環境改造槍。
    </blockquote>

    <!-- ========================================
         Section 4: 終極方案：環境槍
         ======================================== -->
    <h2 id="clentaminator">終極方案：環境槍</h2>
    
    <p>
      <strong>環境改造槍 (Clentaminator)</strong> 是遊戲中最強大的環境控制工具，
      能夠快速、大範圍地改變生物群系。
    </p>

    <!-- 環境改造槍 Hero Section (不被 prose 影響) -->
    <div class="not-prose clentaminator-section">
      <div class="clentaminator-hero">
        <div class="clentaminator-hero__bg"></div>
        
        <div class="clentaminator-hero__content">
          <div class="clentaminator-hero__badge">
            <Sparkles :size="14" />
            <span>終極解決方案</span>
          </div>
          
          <div class="clentaminator-hero__main">
            <div class="clentaminator-hero__icon-wrapper">
              <BaseIcon 
                :icon="clentaminatorData.icon" 
                :size="80" 
                class="clentaminator-hero__icon"
              />
            </div>
            
            <div class="clentaminator-hero__info">
              <h3 class="clentaminator-hero__title">{{ clentaminatorData.name }}</h3>
              <p class="clentaminator-hero__subtitle">{{ clentaminatorData.nameEn }}</p>
              
              <div class="clentaminator-hero__stats">
                <div class="stat-pill">
                  <Target :size="14" />
                  <span>範圍 {{ clentaminatorData.stats.range }}</span>
                </div>
                <div class="stat-pill">
                  <Layers :size="14" />
                  <span>{{ clentaminatorData.stats.penetration }}</span>
                </div>
                <div class="stat-pill">
                  <Zap :size="14" />
                  <span>{{ clentaminatorData.stats.speed }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 取得條件 -->
          <div class="clentaminator-hero__acquire">
            <div class="acquire-card">
              <div class="acquire-card__header">
                <User :size="16" />
                <span>販售 NPC</span>
              </div>
              <div class="acquire-card__content">
                <BaseIcon 
                  :icon="clentaminatorData.seller.icon" 
                  :size="40" 
                  class="acquire-card__npc-icon"
                />
                <div class="acquire-card__npc-info">
                  <span class="acquire-card__npc-name">{{ clentaminatorData.seller.name }}</span>
                  <span class="acquire-card__npc-en">{{ clentaminatorData.seller.nameEn }}</span>
                </div>
              </div>
              <div class="acquire-card__condition">
                <Info :size="14" />
                <span>{{ clentaminatorData.seller.condition }}</span>
              </div>
            </div>
            
            <div class="acquire-card">
              <div class="acquire-card__header">
                <Coins :size="16" />
                <span>價格</span>
              </div>
              <div class="acquire-card__content acquire-card__content--price">
                <BaseIcon 
                  :icon="clentaminatorData.priceIcon" 
                  :size="32" 
                />
                <span class="acquire-card__price">{{ clentaminatorData.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 溶液類型 -->
      <div class="solutions-section">
        <h4 class="solutions-section__title">
          <Droplets :size="18" />
          <span>溶液類型</span>
        </h4>
        
        <div class="solution-bottles">
          <div 
            v-for="sol in clentaminatorData.solutions" 
            :key="sol.nameEn"
            :class="['solution-bottle', { 'solution-bottle--recommended': sol.recommended }]"
          >
            <div class="solution-bottle__icon-wrapper">
              <BaseIcon :icon="sol.icon" :size="36" />
              <span 
                v-if="sol.recommended" 
                class="solution-bottle__badge"
              >推薦</span>
            </div>
            <div class="solution-bottle__info">
              <span class="solution-bottle__name">{{ sol.name }}</span>
              <span class="solution-bottle__effect">{{ sol.effect }}</span>
              <span class="solution-bottle__price">{{ sol.price }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 操作提示 -->
      <div class="operation-tips">
        <h4 class="operation-tips__title">操作技巧</h4>
        <div class="operation-tips__grid">
          <div 
            v-for="(tip, index) in operationTips" 
            :key="index"
            class="tip-card"
          >
            <component :is="tip.icon" :size="20" class="tip-card__icon" />
            <span class="tip-card__text">{{ tip.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================
         最終提示
         ======================================== -->
    <h2 id="summary">總結與建議</h2>
    
    <p>環境治理是困難模式中不可忽視的重要任務。以下是關鍵建議：</p>
    
    <ul>
      <li><strong>預防優於治療</strong> - 擊敗肉山後立即挖掘隔離帶</li>
      <li><strong>保護叢林優先</strong> - 叢林破壞是不可逆的</li>
      <li><strong>善用神聖之地</strong> - 作為緩衝區阻擋腐化/猩紅</li>
      <li><strong>儲備資金</strong> - 環境改造槍和溶液需要大量金幣</li>
    </ul>

    <!-- 最終提示框 (不被 prose 影響) -->
    <div class="not-prose final-tip">
      <div class="final-tip__icon">💡</div>
      <div class="final-tip__content">
        <h4 class="final-tip__title">專業建議</h4>
        <p class="final-tip__text">
          擊敗肉山後，立即在叢林邊界挖掘 4 格寬的隔離帶。
          這能為你爭取足夠的時間來準備環境改造槍。
          記住：預防永遠比治療更省資源！
        </p>
      </div>
    </div>
  </DocLayout>
</template>

<style scoped>
/* ==========================================
   Hero Banner
   ========================================== */
.hero-banner {
  position: relative;
  background: linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%);
  border-radius: 1rem;
  overflow: hidden;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.hero-banner__bg {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 40%),
    radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.2) 0%, transparent 40%);
}

.hero-banner__content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 1;
}

.hero-banner__icon {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
}

.hero-banner__text {
  flex: 1;
  color: white;
}

.hero-banner__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.hero-banner__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.hero-banner__subtitle {
  font-size: 0.9375rem;
  opacity: 0.8;
  margin: 0.25rem 0 0;
  font-style: italic;
}

.hero-banner__desc {
  margin: 0.75rem 0 0;
  font-size: 0.9375rem;
  opacity: 0.9;
  line-height: 1.5;
}

/* ==========================================
   Biome Grid
   ========================================== */
.biome-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

.biome-card {
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 2px solid;
}

.biome-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.biome-card__icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.biome-card__title-group {
  flex: 1;
  min-width: 0;
}

.biome-card__name {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.biome-card__name-en {
  font-size: 0.6875rem;
  opacity: 0.7;
}

.biome-card__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
}

.biome-card__badge--safe {
  background: #dcfce7;
  color: #166534;
}

.biome-card__desc {
  font-size: 0.8125rem;
  line-height: 1.5;
  margin: 0 0 0.75rem;
  opacity: 0.9;
}

.biome-card__spread,
.biome-card__blocks {
  margin-bottom: 0.5rem;
}

.biome-card__label {
  display: block;
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.biome-card__value {
  font-size: 0.875rem;
  font-weight: 600;
}

.biome-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.biome-card__tag {
  padding: 0.125rem 0.5rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 500;
}

.biome-card__danger {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  line-height: 1.4;
  margin-top: 0.75rem;
}

.biome-card__danger--warning {
  background: #fef2f2;
  color: #991b1b;
}

.biome-card__danger--safe {
  background: #f0fdf4;
  color: #166534;
}

/* ==========================================
   Spread Table
   ========================================== */
.spread-table {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  overflow: hidden;
  margin: 1.5rem 0;
}

.spread-table__header {
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--color-bg-main);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.spread-table__row {
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--color-border);
  align-items: center;
}

.spread-table__row--critical {
  background: #fef3c7;
}

.spread-table__cell--block {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.spread-table__block-info {
  display: flex;
  flex-direction: column;
}

.spread-table__block-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.spread-table__block-en {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
}

.spread-table__cell--status {
  text-align: center;
}

.spread-table__icon--yes {
  color: #16a34a;
}

.spread-table__icon--no {
  color: #dc2626;
}

.spread-table__cell--note {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

/* ==========================================
   Jungle Alert
   ========================================== */
.jungle-alert {
  background: #fefce8;
  border: 2px solid #fbbf24;
  border-left-width: 6px;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 20px -4px rgba(251, 191, 36, 0.2);
}

.jungle-alert__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.jungle-alert__icon-wrapper {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #84cc16 0%, #22c55e 100%);
  border-radius: 1rem;
  flex-shrink: 0;
}

.jungle-alert__title-group {
  flex: 1;
}

.jungle-alert__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  background: #fbbf24;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #78350f;
  margin-bottom: 0.375rem;
}

.jungle-alert__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #78350f;
  margin: 0;
}

.jungle-alert__content {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.jungle-alert__subtitle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #166534;
  margin: 0 0 0.75rem;
}

.jungle-alert__text {
  font-size: 0.875rem;
  color: #713f12;
  line-height: 1.6;
  margin: 0 0 0.75rem;
}

.jungle-alert__text--emphasis {
  padding: 0.75rem 1rem;
  background: rgba(251, 191, 36, 0.3);
  border-radius: 0.5rem;
  font-weight: 500;
}

.jungle-alert__formula {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-content: center;
}

.formula-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.formula-step--danger {
  padding: 0.5rem 0.75rem;
  background: #fef2f2;
  border: 2px solid #fca5a5;
  border-radius: 0.5rem;
  color: #991b1b;
}

.formula-arrow {
  color: #78350f;
  flex-shrink: 0;
}

.jungle-alert__consequence {
  padding: 1rem;
  background: #fef2f2;
  border-radius: 0.5rem;
  align-self: start;
}

.jungle-alert__consequence-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #991b1b;
  margin: 0 0 0.5rem;
}

.jungle-alert__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.jungle-alert__list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #991b1b;
}

.list-icon--danger {
  flex-shrink: 0;
  color: #dc2626;
}

.jungle-alert__solution {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #166534;
}

.jungle-alert__solution p {
  margin: 0;
  line-height: 1.5;
}

/* ==========================================
   Solutions Grid
   ========================================== */
.solutions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

.solution-card {
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  padding: 1rem;
  transition: all 0.2s ease;
}

.solution-card:hover {
  border-color: var(--color-primary-light);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
}

.solution-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.solution-card__emoji {
  font-size: 2rem;
  line-height: 1;
}

.solution-card__icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.solution-card__title {
  display: flex;
  flex-direction: column;
}

.solution-card__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.solution-card__name-en {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
}

.solution-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.solution-card__effect,
.solution-card__limitation {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.8125rem;
  line-height: 1.4;
}

.solution-card__effect {
  color: #166534;
}

.solution-card__effect-icon {
  color: #16a34a;
  flex-shrink: 0;
  margin-top: 2px;
}

.solution-card__limitation {
  color: #92400e;
}

.solution-card__limit-icon {
  color: #d97706;
  flex-shrink: 0;
  margin-top: 2px;
}

/* ==========================================
   Clentaminator Section
   ========================================== */
.clentaminator-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
  margin: 1.5rem 0;
}

.clentaminator-hero {
  position: relative;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #0ea5e9 100%);
  padding: 2rem;
}

.clentaminator-hero__bg {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.2) 0%, transparent 40%);
}

.clentaminator-hero__content {
  position: relative;
  z-index: 1;
}

.clentaminator-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(251, 191, 36, 0.9);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #78350f;
  margin-bottom: 1rem;
}

.clentaminator-hero__main {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.clentaminator-hero__icon-wrapper {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  flex-shrink: 0;
}

.clentaminator-hero__icon {
  filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.5));
}

.clentaminator-hero__info {
  flex: 1;
  color: white;
}

.clentaminator-hero__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.clentaminator-hero__subtitle {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0.25rem 0 0.75rem;
  font-style: italic;
}

.clentaminator-hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
}

.clentaminator-hero__acquire {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.acquire-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  padding: 1rem;
  color: white;
}

.acquire-card__header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
  margin-bottom: 0.75rem;
}

.acquire-card__content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.acquire-card__content--price {
  gap: 0.5rem;
}

.acquire-card__npc-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.acquire-card__npc-info {
  display: flex;
  flex-direction: column;
}

.acquire-card__npc-name {
  font-size: 1rem;
  font-weight: 600;
}

.acquire-card__npc-en {
  font-size: 0.75rem;
  opacity: 0.7;
}

.acquire-card__price {
  font-size: 1.25rem;
  font-weight: 700;
}

.acquire-card__condition {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.75rem;
  opacity: 0.85;
}

/* Solutions Section */
.solutions-section {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.solutions-section__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem;
}

.solution-bottles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.solution-bottle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: var(--color-bg-main);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  transition: all 0.15s ease;
}

.solution-bottle:hover {
  border-color: var(--color-primary-light);
}

.solution-bottle--recommended {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-color: #86efac;
}

.solution-bottle__icon-wrapper {
  position: relative;
  flex-shrink: 0;
}

.solution-bottle__badge {
  position: absolute;
  top: -8px;
  right: -8px;
  padding: 0.125rem 0.375rem;
  background: #16a34a;
  border-radius: 9999px;
  font-size: 0.5625rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

.solution-bottle__info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.solution-bottle__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.solution-bottle__effect {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.solution-bottle__price {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
}

/* Operation Tips */
.operation-tips {
  padding: 1.5rem;
}

.operation-tips__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem;
}

.operation-tips__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.tip-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: var(--color-bg-main);
  border-radius: 0.5rem;
}

.tip-card__icon {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.tip-card__text {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

/* ==========================================
   Final Tip
   ========================================== */
.final-tip {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #93c5fd;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
}

.final-tip__icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.final-tip__content {
  flex: 1;
}

.final-tip__title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 0.5rem;
}

.final-tip__text {
  font-size: 0.9375rem;
  color: #1e3a8a;
  line-height: 1.6;
  margin: 0;
}

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 900px) {
  .biome-grid {
    grid-template-columns: 1fr;
  }
  
  .clentaminator-hero__acquire {
    grid-template-columns: 1fr;
  }
  
  .solution-bottles {
    grid-template-columns: 1fr;
  }
  
  .operation-tips__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-banner__content {
    flex-direction: column;
    text-align: center;
  }
  
  .jungle-alert__content {
    grid-template-columns: 1fr;
  }
  
  .clentaminator-hero__main {
    flex-direction: column;
    text-align: center;
  }
  
  .clentaminator-hero__stats {
    justify-content: center;
  }
  
  .spread-table__header,
  .spread-table__row {
    grid-template-columns: 1fr 80px;
  }
  
  .spread-table__cell--note {
    display: none;
  }
  
  .solutions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
