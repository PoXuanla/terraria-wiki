import { createRouter, createWebHistory } from "vue-router";
import { Home, BookOpen, Crosshair, FileText, Skull } from "lucide-vue-next";

/**
 * 路由配置
 * 使用 Lazy Loading 方式引入頁面組件
 */

// 佈局組件
const MainLayout = () => import("@/layouts/MainLayout.vue");

// 頁面組件 (Lazy Loading)
// 指南頁面
const GuideMimic = () => import("@/views/guides/MimicGuide.vue");
const GuideClentaminator = () =>
  import("@/views/guides/ClentaminatorGuide.vue");
const GuideMimicDoc = () => import("@/views/guides/MimicHuntingDoc.vue");

// 武器頁面
const WeaponsIndex = () => import("@/views/weapons/WeaponsIndex.vue");
const WeaponDaedalus = () => import("@/views/weapons/DaedalusStormbow.vue");
const WeaponOnyxBlaster = () => import("@/views/weapons/OnyxBlaster.vue");
const WeaponShadowflameKnife = () =>
  import("@/views/weapons/ShadowflameKnife.vue");
const WeaponMeteorStaff = () => import("@/views/weapons/MeteorStaff.vue");
const WeaponSkyFracture = () => import("@/views/weapons/SkyFracture.vue");
const WeaponSanguineStaff = () => import("@/views/weapons/SanguineStaff.vue");

// Boss 頁面
const BossTheTwins = () => import("@/views/boss/TheTwins.vue");

/**
 * 路由表
 */
const routes = [
  {
    path: "/",
    component: MainLayout,
    redirect: "/guides/mimic",
    meta: {
      title: "首頁",
      icon: Home,
    },
    children: [
      // ==========================================
      // 指南 (Guides)
      // ==========================================
      {
        path: "guides/mimic",
        name: "GuideMimic",
        component: GuideMimic,
        meta: {
          title: "寶藏怪狩獵指南",
          icon: "https://terraria.wiki.gg/images/f/f5/Mimic.png",
          group: "guides",
        },
      },
      {
        path: "guides/clentaminator",
        name: "GuideClentaminator",
        component: GuideClentaminator,
        meta: {
          title: "環境治理指南",
          icon: "https://terraria.wiki.gg/images/9/9b/Clentaminator.png",
          group: "guides",
        },
      },
      {
        path: "guides/mimic-doc",
        name: "GuideMimicDoc",
        component: GuideMimicDoc,
        meta: {
          title: "寶箱怪指南 (文檔版)",
          icon: FileText,
          group: "guides",
        },
      },

      // ==========================================
      // 武器 (Weapons)
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
      {
        path: "weapons/daedalus",
        name: "WeaponDaedalus",
        component: WeaponDaedalus,
        meta: {
          title: "代達羅斯風暴弓",
          icon: "https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png",
          group: "weapons",
        },
      },
      {
        path: "weapons/onyx-blaster",
        name: "WeaponOnyxBlaster",
        component: WeaponOnyxBlaster,
        meta: {
          title: "瑪瑙爆破槍",
          icon: "https://terraria.wiki.gg/images/c/c0/Onyx_Blaster.png",
          group: "weapons",
        },
      },
      {
        path: "weapons/shadowflame-knife",
        name: "WeaponShadowflameKnife",
        component: WeaponShadowflameKnife,
        meta: {
          title: "暗影焰飛刀",
          icon: "https://terraria.wiki.gg/images/6/67/Shadowflame_Knife.png",
          group: "weapons",
        },
      },
      {
        path: "weapons/meteor-staff",
        name: "WeaponMeteorStaff",
        component: WeaponMeteorStaff,
        meta: {
          title: "流星法杖",
          icon: "https://terraria.wiki.gg/images/c/cd/Meteor_Staff.png",
          group: "weapons",
        },
      },
      {
        path: "weapons/sky-fracture",
        name: "WeaponSkyFracture",
        component: WeaponSkyFracture,
        meta: {
          title: "天裂",
          icon: "https://terraria.wiki.gg/images/5/50/Sky_Fracture.png",
          group: "weapons",
        },
      },
      {
        path: "weapons/sanguine-staff",
        name: "WeaponSanguineStaff",
        component: WeaponSanguineStaff,
        meta: {
          title: "血紅法杖",
          icon: "https://terraria.wiki.gg/images/e/e7/Sanguine_Staff.png",
          group: "weapons",
        },
      },

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

/**
 * 建立路由實例
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

/**
 * 側邊欄選單配置
 * 導出供 Sidebar 組件使用
 */
export const menuConfig = [
  {
    group: "指南",
    groupKey: "guides",
    icon: BookOpen,
    items: [
      {
        title: "寶藏怪狩獵指南",
        path: "/guides/mimic",
        icon: "https://terraria.wiki.gg/images/f/f5/Mimic.png",
      },
      {
        title: "環境治理指南",
        path: "/guides/clentaminator",
        icon: "https://terraria.wiki.gg/images/9/9b/Clentaminator.png",
      },
      {
        title: "寶箱怪指南 (文檔版)",
        path: "/guides/mimic-doc",
        icon: FileText,
      },
    ],
  },
  {
    group: "武器圖鑑",
    groupKey: "weapons",
    icon: Crosshair,
    items: [
      {
        title: "武器總覽",
        path: "/weapons",
        icon: Crosshair,
      },
      {
        title: "代達羅斯風暴弓",
        path: "/weapons/daedalus",
        icon: "https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png",
      },
      {
        title: "瑪瑙爆破槍",
        path: "/weapons/onyx-blaster",
        icon: "https://terraria.wiki.gg/images/c/c0/Onyx_Blaster.png",
      },
      {
        title: "暗影焰飛刀",
        path: "/weapons/shadowflame-knife",
        icon: "https://terraria.wiki.gg/images/6/67/Shadowflame_Knife.png",
      },
      {
        title: "流星法杖",
        path: "/weapons/meteor-staff",
        icon: "https://terraria.wiki.gg/images/c/cd/Meteor_Staff.png",
      },
      {
        title: "天裂",
        path: "/weapons/sky-fracture",
        icon: "https://terraria.wiki.gg/images/5/50/Sky_Fracture.png",
      },
      {
        title: "血紅法杖",
        path: "/weapons/sanguine-staff",
        icon: "https://terraria.wiki.gg/images/e/e7/Sanguine_Staff.png",
      },
    ],
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
    ],
  },
];

export default router;
