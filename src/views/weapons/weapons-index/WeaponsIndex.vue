<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Crosshair,
  Search,
  X,
  ArrowUpDown,
  PackageOpen,
  Star,
} from "lucide-vue-next";
import { weapons as weaponData, classColors } from "@/data/weapons";
import WeaponCard from "@/components/weapons/WeaponCard.vue";
import type {
  WeaponListItem,
  ClassOption,
  RarityOption,
  SourceOption,
  SortOption,
  SortKey,
  SortOrder,
} from "./types";
import { RARITY_COLORS, DEFAULT_COLOR } from "./types";

/**
 * 武器圖鑑 - 索引頁面
 *
 * 功能：
 * - 搜尋武器（中/英文名稱）
 * - 職業篩選（遠程/近戰/魔法/召喚）
 * - 稀有度篩選
 * - 取得方式篩選（製作/掉落）
 * - 排序功能
 */

// ==========================================
// 資料處理
// ==========================================

// 將武器資料轉換為列表顯示格式
const weapons: WeaponListItem[] = weaponData.map((w) => ({
  ...w,
  id: w.slug,
  // 提取數值用於排序（處理 "28 (步槍) / 28 (手槍)" 這類格式）
  damageNum:
    typeof w.stats.damage.value === "number"
      ? w.stats.damage.value
      : parseInt(String(w.stats.damage.value).match(/\d+/)?.[0] || "0"),
}));

// 職業選項
const classOptions: ClassOption[] = [
  { key: "", label: "全部", icon: "🎯" },
  { key: "Ranger", label: "遠程", icon: "🏹" },
  { key: "Melee", label: "近戰", icon: "⚔️" },
  { key: "Mage", label: "魔法", icon: "🔮" },
  { key: "Summoner", label: "召喚", icon: "👻" },
];

// 稀有度選項（從資料中提取唯一值）
const rarityLevels = [...new Set(weapons.map((w) => w.rarity.level))].sort(
  (a, b) => a - b
);
const rarityOptions: RarityOption[] = [
  { key: "", label: "全部" },
  ...rarityLevels.map((level) => ({ key: level, label: `${level}` })),
];

// 取得方式選項
const sourceOptions: SourceOption[] = [
  { key: "", label: "全部", icon: "📦" },
  { key: "crafting", label: "製作", icon: "🔨" },
  { key: "drop", label: "掉落", icon: "💀" },
];

// 排序選項
const sortOptions: SortOption[] = [
  { key: "damage", label: "傷害" },
  { key: "rarity", label: "稀有度" },
  { key: "name", label: "名稱" },
];

// ==========================================
// 篩選狀態
// ==========================================

const searchQuery = ref<string>("");
const selectedClass = ref<string>("");
const selectedRarity = ref<number | "">("");
const selectedSource = ref<string>("");
const sortBy = ref<SortKey>("damage");
const sortOrder = ref<SortOrder>("desc");

// ==========================================
// 計算屬性
// ==========================================

// 是否有任何篩選條件
const hasFilters = computed<boolean>(() => {
  return Boolean(
    searchQuery.value ||
      selectedClass.value ||
      selectedRarity.value ||
      selectedSource.value
  );
});

// 篩選後的武器列表
const filteredWeapons = computed<WeaponListItem[]>(() => {
  let result = [...weapons];

  // 搜尋過濾
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (w) =>
        w.name.toLowerCase().includes(query) ||
        w.nameEn.toLowerCase().includes(query)
    );
  }

  // 職業過濾
  if (selectedClass.value) {
    result = result.filter((w) => w.class === selectedClass.value);
  }

  // 稀有度過濾
  if (selectedRarity.value) {
    result = result.filter((w) => w.rarity.level === selectedRarity.value);
  }

  // 取得方式過濾
  if (selectedSource.value) {
    result = result.filter((w) =>
      w.sources.some((s) => s.type === selectedSource.value)
    );
  }

  // 排序
  result.sort((a, b) => {
    let comparison = 0;

    switch (sortBy.value) {
      case "damage":
        comparison = a.damageNum - b.damageNum;
        break;
      case "rarity":
        comparison = a.rarity.level - b.rarity.level;
        break;
      case "name":
        comparison = a.name.localeCompare(b.name, "zh-TW");
        break;
    }

    return sortOrder.value === "desc" ? -comparison : comparison;
  });

  return result;
});

// ==========================================
// 方法
// ==========================================

// 取得職業顏色
const getClassColor = (className: string): string =>
  classColors[className]?.hex || DEFAULT_COLOR;

// 取得稀有度顏色
const getRarityColor = (level: number | ""): string => {
  if (level === "") return DEFAULT_COLOR;
  return RARITY_COLORS[level] || DEFAULT_COLOR;
};

// 切換排序順序
const toggleSortOrder = (): void => {
  sortOrder.value = sortOrder.value === "desc" ? "asc" : "desc";
};

// 清除所有篩選
const clearFilters = (): void => {
  searchQuery.value = "";
  selectedClass.value = "";
  selectedRarity.value = "";
  selectedSource.value = "";
};
</script>

<template>
  <div class="weapons-index">
    <!-- 頁面標題 -->
    <header class="page-header">
      <div class="page-header__icon">
        <Crosshair :size="32" />
      </div>
      <div class="page-header__text">
        <h1 class="page-header__title">武器圖鑑</h1>
        <p class="page-header__subtitle">困難模式 Tier 1 推薦武器</p>
      </div>
    </header>

    <!-- 篩選區塊 -->
    <section class="filter-section">
      <!-- 搜尋框 -->
      <div class="search-box">
        <Search :size="18" class="search-box__icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜尋武器名稱..."
          class="search-box__input"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="search-box__clear"
        >
          <X :size="16" />
        </button>
      </div>

      <!-- 篩選器群組 -->
      <div class="filter-groups">
        <!-- 職業篩選 -->
        <div class="filter-group">
          <span class="filter-group__label">職業</span>
          <div class="filter-pills">
            <button
              v-for="option in classOptions"
              :key="option.key"
              @click="selectedClass = option.key"
              class="filter-pill"
              :class="{ 'filter-pill--active': selectedClass === option.key }"
              :style="
                option.key && selectedClass === option.key
                  ? {
                      '--pill-color': getClassColor(option.key),
                      backgroundColor: getClassColor(option.key),
                      borderColor: getClassColor(option.key),
                    }
                  : {}
              "
            >
              <span class="filter-pill__icon">{{ option.icon }}</span>
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>

        <!-- 稀有度篩選 -->
        <div class="filter-group">
          <span class="filter-group__label">稀有度</span>
          <div class="filter-pills">
            <button
              v-for="option in rarityOptions"
              :key="option.key"
              @click="selectedRarity = option.key"
              class="filter-pill filter-pill--rarity"
              :class="{ 'filter-pill--active': selectedRarity === option.key }"
              :style="
                option.key && selectedRarity === option.key
                  ? {
                      backgroundColor: getRarityColor(option.key),
                      borderColor: getRarityColor(option.key),
                    }
                  : option.key
                    ? {
                        '--pill-border': getRarityColor(option.key),
                      }
                    : {}
              "
            >
              <Star
                v-if="option.key"
                :size="12"
                :style="{
                  color:
                    selectedRarity === option.key
                      ? 'white'
                      : getRarityColor(option.key),
                }"
              />
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>

        <!-- 取得方式篩選 -->
        <div class="filter-group">
          <span class="filter-group__label">取得方式</span>
          <div class="filter-pills">
            <button
              v-for="option in sourceOptions"
              :key="option.key"
              @click="selectedSource = option.key"
              class="filter-pill"
              :class="{ 'filter-pill--active': selectedSource === option.key }"
            >
              <span class="filter-pill__icon">{{ option.icon }}</span>
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>

        <!-- 排序 -->
        <div class="filter-group">
          <span class="filter-group__label">排序</span>
          <div class="filter-pills">
            <button
              v-for="option in sortOptions"
              :key="option.key"
              @click="sortBy = option.key"
              class="filter-pill"
              :class="{ 'filter-pill--active': sortBy === option.key }"
            >
              <span>{{ option.label }}</span>
            </button>
            <button
              @click="toggleSortOrder"
              class="sort-order-btn"
              :title="sortOrder === 'desc' ? '降序' : '升序'"
            >
              <ArrowUpDown :size="16" />
              <span>{{ sortOrder === "desc" ? "降序" : "升序" }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 結果統計與清除按鈕 -->
      <div class="filter-footer">
        <span class="result-count">
          顯示 <strong>{{ filteredWeapons.length }}</strong> 件武器
        </span>
        <button v-if="hasFilters" @click="clearFilters" class="clear-btn">
          <X :size="14" />
          <span>清除篩選</span>
        </button>
      </div>
    </section>

    <!-- 武器網格 -->
    <TransitionGroup
      v-if="filteredWeapons.length > 0"
      tag="section"
      name="weapon-card"
      class="weapons-grid"
    >
      <WeaponCard
        v-for="weapon in filteredWeapons"
        :key="weapon.id"
        :weapon="weapon"
      />
    </TransitionGroup>

    <!-- 空狀態 -->
    <section v-else class="empty-state">
      <div class="empty-state__icon">
        <PackageOpen :size="64" />
      </div>
      <h3 class="empty-state__title">找不到符合條件的武器</h3>
      <p class="empty-state__description">嘗試調整篩選條件或清除搜尋關鍵字</p>
      <button @click="clearFilters" class="empty-state__btn">
        <X :size="16" />
        <span>清除所有篩選</span>
      </button>
    </section>

    <!-- 底部提示 -->
    <footer class="page-footer">
      <p class="footer-text">
        💡 提示：點擊武器卡片可查看詳細資訊，包含屬性數據、取得方式與使用策略。
      </p>
    </footer>
  </div>
</template>

<style scoped>
.weapons-index {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ==========================================
   頁面標題
   ========================================== */
.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);
  border-radius: 1rem;
  color: white;
}

.page-header__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.page-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.page-header__subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.25rem 0 0;
}

/* ==========================================
   篩選區塊
   ========================================== */
.filter-section {
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:global(.dark) .filter-section {
  box-shadow: none;
  border: 1px solid var(--color-border);
}

/* 搜尋框 */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box__icon {
  position: absolute;
  left: 1rem;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-box__input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-bg-main);
  color: var(--color-text-primary);
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}

.search-box__input::placeholder {
  color: var(--color-text-muted);
}

.search-box__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.search-box__clear {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: var(--color-bg-card);
  border-radius: 50%;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-box__clear:hover {
  background: var(--color-border);
  color: var(--color-text-primary);
}

/* 篩選器群組 */
.filter-groups {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-group__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  min-width: 60px;
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* 膠囊按鈕 */
.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  background: var(--color-bg-main);
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill:hover {
  border-color: var(--color-primary-light);
  color: var(--color-text-primary);
}

.filter-pill--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.filter-pill--rarity {
  border-color: var(--pill-border, var(--color-border));
}

.filter-pill__icon {
  font-size: 0.875rem;
}

/* 排序按鈕 */
.sort-order-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  background: var(--color-bg-main);
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-order-btn:hover {
  border-color: var(--color-primary-light);
  color: var(--color-text-primary);
}

/* 篩選底部 */
.filter-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.result-count {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.result-count strong {
  color: var(--color-primary);
  font-weight: 600;
}

.clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: 0.375rem;
  background: #fee2e2;
  color: #dc2626;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

:global(.dark) .clear-btn {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

.clear-btn:hover {
  background: #fecaca;
}

:global(.dark) .clear-btn:hover {
  background: rgba(239, 68, 68, 0.25);
}

/* ==========================================
   武器網格
   ========================================== */
.weapons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 1200px) {
  .weapons-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .weapons-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .weapons-grid {
    grid-template-columns: 1fr;
  }
}

/* ==========================================
   卡片切換動畫
   ========================================== */

/* 進入動畫 */
.weapon-card-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.weapon-card-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.weapon-card-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* 離開動畫 */
.weapon-card-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.weapon-card-leave-active {
  transition: all 0.25s ease-out;
  position: absolute;
}

.weapon-card-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}

/* 移動動畫（重新排序時） */
.weapon-card-move {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ==========================================
   空狀態
   ========================================== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: var(--color-bg-card);
  border-radius: 0.75rem;
  border: 2px dashed var(--color-border);
  text-align: center;
}

.empty-state__icon {
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem;
}

.empty-state__description {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  margin: 0 0 1.5rem;
}

.empty-state__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--color-primary);
  color: white;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-state__btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}

/* ==========================================
   底部提示
   ========================================== */
.page-footer {
  background: #fef3c7;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  border: 1px solid #fcd34d;
}

:global(.dark) .page-footer {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
}

.footer-text {
  margin: 0;
  font-size: 0.875rem;
  color: #92400e;
}

:global(.dark) .footer-text {
  color: #fcd34d;
}

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    text-align: center;
  }

  .filter-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-group__label {
    margin-bottom: 0.25rem;
  }

  .filter-footer {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
}
</style>

