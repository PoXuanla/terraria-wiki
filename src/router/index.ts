import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type Router,
} from "vue-router";
import type { Component } from "vue";
import { Home, BookOpen, Crosshair, FileText, Skull } from "lucide-vue-next";
import { weapons } from "@/data/weapons";
import { guides } from "@/data/guides";

/**
 * 路由配置
 * 使用 Lazy Loading 方式引入頁面組件
 */

// ==========================================
// 類型定義
// ==========================================

/**
 * 路由 Meta 資訊
 */
interface RouteMeta {
  title: string;
  icon?: Component | string;
  group?: string;
  [key: string]: unknown;
}

/**
 * 選單項目
 */
export interface MenuItem {
  title: string;
  path: string;
  icon: Component | string;
}

/**
 * 選單群組
 */
export interface MenuGroup {
  group: string;
  groupKey: string;
  icon: Component;
  items: MenuItem[];
}

// ==========================================
// 工具函數
// ==========================================

/**
 * 將 kebab-case 轉換為 PascalCase
 */
const kebabToPascal = (str: string): string => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

// ==========================================
// 組件導入
// ==========================================

// 佈局組件
const MainLayout = () => import("@/layouts/MainLayout.vue");

// 頁面組件 (Lazy Loading)
// 首頁
const HomePage = () => import("@/views/HomePage.vue");

// 指南頁面 - 使用 import.meta.glob 動態導入
const guideModules = import.meta.glob<{ default: Component }>(
  "@/views/guides/*.vue"
);

// 武器頁面 - 使用 import.meta.glob 動態導入
const WeaponsIndex = () =>
  import("@/views/weapons/weapons-index/WeaponsIndex.vue");

// 使用 Vite 的 import.meta.glob 預載入所有武器組件
const weaponModules = import.meta.glob<{ default: Component }>(
  "@/views/weapons/*.vue"
);

// Boss 頁面
const BossTheTwins = () => import("@/views/boss/TheTwins.vue");
const BossTheDestroyer = () => import("@/views/boss/TheDestroyer.vue");
const BossSkeletronPrime = () => import("@/views/boss/SkeletronPrime.vue");

// ==========================================
// 動態路由生成
// ==========================================

/**
 * 動態生成指南路由
 */
const generateGuideRoutes = () => {
  return guides.map((guide) => {
    const componentPath = `/src/views/guides/${guide.componentName}.vue`;

    return {
      path: `guides/${guide.slug}`,
      name: `Guide${guide.componentName}`,
      component: guideModules[componentPath],
      meta: {
        title: guide.name,
        icon: guide.icon,
        group: "guides",
      },
    };
  });
};

/**
 * 動態生成武器路由
 */
const generateWeaponRoutes = () => {
  return weapons.map((weapon) => {
    const componentName = kebabToPascal(weapon.slug);
    const componentPath = `/src/views/weapons/${componentName}.vue`;

    return {
      path: `weapons/${weapon.slug}`,
      name: `Weapon${componentName}`,
      component: weaponModules[componentPath],
      meta: {
        title: weapon.name,
        icon: weapon.icon,
        group: "weapons",
      },
    };
  });
};

// ==========================================
// 路由配置
// ==========================================

/**
 * 路由表
 */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    meta: {
      title: "首頁",
      icon: Home,
    },
    children: [
      // ==========================================
      // 首頁 (Home)
      // ==========================================
      {
        path: "",
        name: "Home",
        component: HomePage,
        meta: {
          title: "首頁",
          icon: Home,
          group: "home",
        },
      },

      // ==========================================
      // 指南 (Guides) - 動態生成
      // ==========================================
      ...generateGuideRoutes(),

      // ==========================================
      // 武器 (Weapons) - 動態生成
      // ==========================================
      {
        path: "weapons",
        name: "WeaponsIndex",
        component: WeaponsIndex,
        meta: {
          title: "武器圖鑑",
          icon: Crosshair,
          group: "weapons",
        },
      },
      // 從 weapons 數據動態生成路由
      ...generateWeaponRoutes(),

      // ==========================================
      // BOSS
      // ==========================================
      {
        path: "boss/the-twins",
        name: "BossTheTwins",
        component: BossTheTwins,
        meta: {
          title: "機械魔眼 (The Twins)",
          icon: "https://terraria.wiki.gg/images/5/55/Retinazer.png",
          group: "boss",
        },
      },
      {
        path: "boss/the-destroyer",
        name: "BossTheDestroyer",
        component: BossTheDestroyer,
        meta: {
          title: "毀滅者 (The Destroyer)",
          icon: "https://terraria.wiki.gg/images/a/a7/The_Destroyer.png",
          group: "boss",
        },
      },
      {
        path: "boss/skeletron-prime",
        name: "BossSkeletronPrime",
        component: BossSkeletronPrime,
        meta: {
          title: "機械骷髏王 (Skeletron Prime)",
          icon: "https://terraria.wiki.gg/images/2/2a/Skeletron_Prime.png",
          group: "boss",
        },
      },
    ],
  },

  // 404 頁面
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      title: "頁面不存在",
    },
  },
];

// ==========================================
// 路由實例
// ==========================================

/**
 * 建立路由實例
 */
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// ==========================================
// 選單配置
// ==========================================

/**
 * 動態生成指南選單項目
 */
const generateGuideMenuItems = (): MenuItem[] => {
  return guides.map((guide) => ({
    title: guide.name,
    path: `/guides/${guide.slug}`,
    icon: guide.icon,
  }));
};

/**
 * 動態生成武器選單項目
 */
const generateWeaponMenuItems = (): MenuItem[] => {
  return [
    {
      title: "武器總覽",
      path: "/weapons",
      icon: Crosshair,
    },
    ...weapons.map((weapon) => ({
      title: weapon.name,
      path: `/weapons/${weapon.slug}`,
      icon: weapon.icon,
    })),
  ];
};

/**
 * 側邊欄選單配置
 * 導出供 Sidebar 組件使用
 */
export const menuConfig: MenuGroup[] = [
  {
    group: "首頁",
    groupKey: "home",
    icon: Home,
    items: [
      {
        title: "首頁",
        path: "/",
        icon: Home,
      },
    ],
  },
  {
    group: "指南",
    groupKey: "guides",
    icon: BookOpen,
    items: generateGuideMenuItems(),
  },
  {
    group: "武器圖鑑",
    groupKey: "weapons",
    icon: Crosshair,
    items: generateWeaponMenuItems(),
  },
  {
    group: "BOSS",
    groupKey: "boss",
    icon: Skull,
    items: [
      {
        title: "機械魔眼 (The Twins)",
        path: "/boss/the-twins",
        icon: "https://terraria.wiki.gg/images/5/55/Retinazer.png",
      },
      {
        title: "毀滅者 (The Destroyer)",
        path: "/boss/the-destroyer",
        icon: "https://terraria.wiki.gg/images/a/a7/The_Destroyer.png",
      },
      {
        title: "機械骷髏王 (Skeletron Prime)",
        path: "/boss/skeletron-prime",
        icon: "https://terraria.wiki.gg/images/2/2a/Skeletron_Prime.png",
      },
    ],
  },
];

export default router;
