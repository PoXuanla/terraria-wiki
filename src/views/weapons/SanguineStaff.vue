<script setup>
import WeaponLayout from '@/components/WeaponLayout.vue'

/**
 * 血紅法杖 (Sanguine Staff)
 * 
 * 召喚武器 - 困難模式 Tier 1 推薦武器
 * 來源：恐懼鸚鵡螺掉落
 */

const weaponData = {
  // 基本資訊
  name: '血紅法杖',
  nameEn: 'Sanguine Staff',
  class: 'Summoner',
  classLabel: '召喚',
  
  // 稀有度
  rarity: {
    level: 5,
    color: '#f472b6',
    label: '稀有度 5',
  },
  
  // 圖示與連結
  icon: 'https://terraria.wiki.gg/images/e/e7/Sanguine_Staff.png',
  wikiUrl: 'https://terraria.wiki.gg/wiki/Sanguine_Staff',
  
  // 數值屬性
  stats: {
    damage: {
      value: 35,
      label: '傷害',
    },
    knockback: {
      value: 3,
      label: '擊退',
      description: '非常弱',
    },
    critChance: {
      value: 4,
      label: '暴擊率',
    },
    useTime: {
      value: 36,
      label: '使用時間',
      description: '非常慢',
    },
  },
  
  // 描述
  description: '召喚血紅蝙蝠為你作戰。這些蝙蝠擁有完美的追蹤 AI，會緊緊跟隨敵人不放，即使目標快速移動也能精準命中。每隻蝙蝠佔用一個召喚欄位。',
  
  // 取得方式
  source: {
    type: 'drop',
    dropFrom: '恐懼鸚鵡螺 (Dreadnautilus)',
    dropChance: '50% (1/2)',
    notes: '恐懼鸚鵡螺是血月期間釣魚時可能出現的迷你 Boss。牠非常強大，建議做好充分準備再挑戰。在困難模式下，牠會掉落血紅法杖、血腥淚滴等強力物品。',
  },
  
  // 推薦理由
  whyGood: '蝙蝠永不脫靶！血紅法杖召喚的蝙蝠擁有遊戲中最好的追蹤 AI，會緊緊黏住快速移動的目標。雖然恐懼鸚鵡螺 (Dreadnautilus) 很難對付，但這把武器絕對值得你花時間刷取。它是機械 Boss 前最強的召喚武器，沒有之一。完美追蹤的特性讓召喚師可以專心閃避，不用擔心召喚物打空。',
}
</script>

<template>
  <WeaponLayout :weapon="weaponData">
    <!-- 額外的策略提示 -->
    <section class="tips-section">
      <h2 class="tips-heading">💡 使用技巧</h2>
      <ul class="tips-list">
        <li>
          <strong>刷取恐懼鸚鵡螺：</strong>在血月期間於任何水域釣魚即可。
          建議建造一個安全的釣魚小屋，搭配召喚裝和鞭子應戰。
        </li>
        <li>
          <strong>完美追蹤：</strong>血紅蝙蝠會自動追蹤最近的敵人，
          即使雙子魔眼的第二階段瘋狂衝刺也能命中。
        </li>
        <li>
          <strong>召喚數量：</strong>盡可能提升召喚上限，
          多隻蝙蝠可以對單一目標造成恐怖的持續傷害。
        </li>
        <li>
          <strong>搭配鞭子：</strong>建議使用冷鞭 (Cool Whip) 或刺花鞭 (Durendal) 
          來標記目標並提供額外傷害加成。
        </li>
        <li>
          <strong>血月觸發：</strong>可以使用血腥淚滴 (Bloody Tear) 手動觸發血月，
          而血腥淚滴也是恐懼鸚鵡螺的掉落物，形成良性循環。
        </li>
      </ul>
    </section>
  </WeaponLayout>
</template>

<style scoped>
.tips-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
}

:global(.dark) .tips-section {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

.tips-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem;
}

.tips-list {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tips-list li {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.tips-list li strong {
  color: var(--color-text-primary);
}
</style>

