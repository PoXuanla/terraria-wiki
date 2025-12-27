# BossDetail 組件使用指南

`BossDetail` 是一個高度可擴展的通用 Boss 詳情頁面組件，支持標準化佈局和自定義擴展。

## 基礎用法

最簡單的使用方式，只需傳入必需的 props：

```vue
<template>
  <DocLayout title="目錄">
    <BossDetail
      :boss-data="bossData"
      :current-slug="BossSlug.YOUR_BOSS"
      :series-config="seriesConfig"
      :stats-cards="statsCards"
      :stats-icon="YourIcon"
    />
  </DocLayout>
</template>
```

## Props 參數

### 必需參數

- `boss-data` (Object) - Boss 數據對象
- `current-slug` (String) - 當前 Boss 的 slug

### 可選參數

#### 配置類

- `series-config` (Object) - 系列配置，用於顯示 Boss 切換器
- `stats-cards` (Array) - 屬性卡片數據，默認 `[]`

#### Stats Section

- `stats-title` (String) - 統計區塊標題，默認 `"屬性數據"`
- `stats-icon` (Component) - 統計區塊圖示
- `stats-grid-cols` (Number) - 統計卡片網格列數，默認 `2`

#### Hero Section

- `glow-variants` (Array) - Hero 區塊發光顏色變體，如 `['red']` 或 `['red', 'green']`

#### Strategy Section

- `watermark-icon` (String) - 戰術區塊水印圖示路徑
- `watermark-horizontal` (Boolean) - 水印是否橫向，默認 `false`

#### 區塊顯示控制

所有區塊默認都會顯示，可以通過以下 props 控制：

- `show-summoning` (Boolean) - 是否顯示召喚區塊，默認 `true`
- `show-arena` (Boolean) - 是否顯示場地區塊，默認 `true`
- `show-stats` (Boolean) - 是否顯示統計區塊，默認 `true`
- `show-behavior` (Boolean) - 是否顯示行為區塊，默認 `true`
- `show-strategy` (Boolean) - 是否顯示戰術區塊，默認 `true`
- `show-equipment` (Boolean) - 是否顯示裝備區塊，默認 `true`
- `show-drops` (Boolean) - 是否顯示掉落區塊，默認 `true`

## Slots 插槽

### Hero Section 相關

- `icon` - 自定義 Boss 圖示（如雙圖示）
- `extra-badges` - 額外的徽章標籤
- `custom-hero` - 完全自定義 Hero 區塊

### 區塊間插入點

在每個標準區塊後面都有對應的插入點，可以添加自定義內容：

- `after-hero` - Hero 區塊後
- `after-summoning` - 召喚區塊後
- `after-arena` - 場地區塊後
- `after-stats` - 統計區塊後（推薦用於特殊階段、機制等）
- `after-behavior` - 行為區塊後
- `after-strategy` - 戰術區塊後
- `after-equipment` - 裝備區塊後
- `after-drops` - 掉落區塊後

### 完全自定義區塊

如果需要完全替換某個區塊，可以使用以下 slots：

- `custom-hero` - 替換整個 Hero 區塊
- `custom-summoning` - 替換召喚區塊
- `custom-arena` - 替換場地區塊
- `custom-stats` - 替換統計區塊
- `custom-behavior` - 替換行為區塊
- `custom-strategy` - 替換戰術區塊
- `custom-equipment` - 替換裝備區塊
- `custom-drops` - 替換掉落區塊

### 向後兼容

- `custom-sections` - 向後兼容的自定義區塊插槽（推薦改用 `after-stats`）

## 使用範例

### 範例 1: 標準 Boss（TheDestroyer）

```vue
<script setup>
import { Bug } from "lucide-vue-next";
import BossDetail from "@/components/boss/BossDetail.vue";

const statsCards = useDestroyerStats(bossData);
</script>

<template>
  <BossDetail
    :boss-data="bossData"
    :current-slug="BossSlug.THE_DESTROYER"
    :series-config="seriesConfig"
    :stats-cards="statsCards"
    stats-title="屬性數據"
    :stats-icon="Bug"
    :stats-grid-cols="2"
    :glow-variants="['red']"
    :watermark-horizontal="true"
  >
    <template #extra-badges>
      <span class="badge badge--easy">✅ 最易擊敗</span>
    </template>
  </BossDetail>
</template>
```

### 範例 2: 多部位 Boss（SkeletronPrime）

```vue
<script setup>
import { Skull } from "lucide-vue-next";
import BossDetail from "@/components/boss/BossDetail.vue";

const statsCards = useSkeletronPrimeStats(bossData);
</script>

<template>
  <BossDetail
    :boss-data="bossData"
    :current-slug="BossSlug.SKELETRON_PRIME"
    :series-config="seriesConfig"
    :stats-cards="statsCards"
    stats-title="各部位屬性"
    :stats-icon="Skull"
    :stats-grid-cols="3"
  >
    <template #extra-badges>
      <span class="badge badge--danger">⚠️ 高難度</span>
    </template>
  </BossDetail>
</template>
```

### 範例 3: 特殊雙 Boss（TheTwins）

有自定義圖示、自定義戰鬥階段區塊、隱藏行為區塊：

```vue
<script setup>
import { Swords, Eye } from "lucide-vue-next";
import BossDetail from "@/components/boss/BossDetail.vue";

const statsCards = useTwinsStats(bossData);
</script>

<template>
  <BossDetail
    :boss-data="bossData"
    :current-slug="BossSlug.THE_TWINS"
    :series-config="seriesConfig"
    :stats-cards="statsCards"
    stats-title="雙眼屬性比較"
    :stats-icon="Eye"
    :stats-grid-cols="2"
    :glow-variants="['red', 'green']"
    :watermark-icon="bossData.icons.spazmatism"
    :show-behavior="false"
  >
    <!-- 自定義雙圖示 -->
    <template #icon>
      <div class="hero__icons">
        <div class="hero__icon-wrapper">
          <img :src="bossData.icons.retinazer" alt="Retinazer" />
        </div>
        <div class="hero__icon-wrapper">
          <img :src="bossData.icons.spazmatism" alt="Spazmatism" />
        </div>
      </div>
    </template>

    <!-- 在統計數據後插入戰鬥階段區塊 -->
    <template #after-stats>
      <section class="section-card">
        <h2 class="section-heading">
          <Swords :size="20" />
          <span>戰鬥階段</span>
        </h2>
        <div class="phases-grid">
          <div v-for="phase in bossData.combat.phases" :key="phase.phase">
            {{ phase.phase }}
          </div>
        </div>
      </section>
    </template>
  </BossDetail>
</template>
```

### 範例 4: 極度特殊的 Boss

如果某個 Boss 需要完全不同的佈局：

```vue
<template>
  <BossDetail
    :boss-data="bossData"
    :current-slug="BossSlug.SPECIAL_BOSS"
    :show-arena="false"
    :show-behavior="false"
  >
    <!-- 完全自定義統計區塊 -->
    <template #custom-stats>
      <YourCustomStatsComponent :data="bossData" />
    </template>

    <!-- 在戰術後插入特殊機制說明 -->
    <template #after-strategy>
      <SpecialMechanicsSection :mechanics="bossData.specialMechanics" />
    </template>

    <!-- 在裝備前插入特殊準備事項 -->
    <template #after-equipment>
      <SpecialPreparationSection />
    </template>
  </BossDetail>
</template>
```

## 區塊順序

組件的標準區塊順序為：

1. Hero Section（頂部展示區）
2. Summoning Section（召喚方式）
3. Arena Section（場地準備）
4. Stats Section（屬性數據）
5. Behavior Section（行為模式）
6. Strategy Section（核心戰術）
7. Equipment Section（推薦裝備）
8. Drops Section（掉落物）

每個區塊之間都有 `after-*` 插槽可以插入自定義內容。

## 樣式指南

### Badge 樣式

如果需要在 `extra-badges` slot 中添加徽章，使用以下類名：

```vue
<span class="badge badge--easy">✅ 最易擊敗</span>
<span class="badge badge--danger">⚠️ 高難度</span>
<span class="badge badge--warning">⚡ 需要準備</span>
```

### 自定義區塊樣式

在自定義區塊中，建議使用統一的卡片和標題樣式：

```vue
<section class="section-card">
  <h2 class="section-heading">
    <span class="section-heading__accent-line"></span>
    <YourIcon :size="20" class="section-heading__icon" />
    <span class="section-heading__text">區塊標題</span>
  </h2>
  
  <!-- 內容 -->
</section>
```

相關樣式類已在各 Boss 頁面的 scoped style 中定義。

## 開發新 Boss 頁面的步驟

1. 在 `src/data/boss/` 創建 Boss 數據文件
2. 在 `src/components/boss/composables/useBossStats.ts` 添加統計數據處理
3. 在 `src/views/boss/` 創建新的 Vue 文件
4. 導入 `BossDetail` 組件和相關工具
5. 根據 Boss 特性選擇合適的 props 和 slots
6. 如有特殊需求，在對應的 slot 中添加自定義內容
7. 在 scoped style 中只定義特殊樣式（badge、自定義區塊等）

## 注意事項

- 所有 `after-*` slots 的內容會自動保持與其他區塊相同的間距
- 使用 `show-*` props 隱藏區塊比使用空 slot 更高效
- 推薦使用 `after-stats` 插入特殊階段、機制等內容
- 如果只需要微調某個區塊，使用 `after-*` slot；如果需要完全重寫，使用 `custom-*` slot
- `custom-sections` slot 保留是為了向後兼容，新代碼應使用 `after-stats`

