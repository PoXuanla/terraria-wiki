import { createRouter, createWebHistory } from "vue-router";
import { Home, BookOpen, Crosshair, FileText, Skull } from "lucide-vue-next";

/**
 * 路由配置
 * 使用 Lazy Loading 方式引入頁面組件
 */

// 佈局組件
const MainLayout = () => import("@/layouts/MainLayout.vue");

// 頁面組件 (Lazy Loading)
// 首頁
const HomePage = () => import("@/views/HomePage.vue");

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
const WeaponGoldenShower = () => import("@/views/weapons/GoldenShower.vue");
const WeaponBladeStaff = () => import("@/views/weapons/BladeStaff.vue");
const WeaponDartRifle = () => import("@/views/weapons/DartRifle.vue");
const WeaponFetidBaghnakhs = () => import("@/views/weapons/FetidBaghnakhs.vue");

// Boss 頁面
const BossTheTwins = () => import("@/views/boss/TheTwins.vue");
const BossTheDestroyer = () => import("@/views/boss/TheDestroyer.vue");
const BossSkeletronPrime = () => import("@/views/boss/SkeletronPrime.vue");

/**
 * 路由表
 */
const routes = [
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
      {
        path: "weapons/golden-shower",
        name: "WeaponGoldenShower",
        component: WeaponGoldenShower,
        meta: {
          title: "黃金雨",
          icon: "https://terraria.wiki.gg/images/0/08/Golden_Shower.png",
          group: "weapons",
        },
      },
      {
        path: "weapons/blade-staff",
        name: "WeaponBladeStaff",
        component: WeaponBladeStaff,
        meta: {
          title: "刃杖",
          icon: "https://terraria.wiki.gg/images/d/d8/Blade_Staff.png",
          group: "weapons",
        },
      },
      {
        path: "weapons/dart-rifle",
        name: "WeaponDartRifle",
        component: WeaponDartRifle,
        meta: {
          title: "飛鏢步槍",
          icon: "https://terraria.wiki.gg/images/6/69/Dart_Rifle.png",
          group: "weapons",
        },
      },
      {
        path: "weapons/fetid-baghnakhs",
        name: "WeaponFetidBaghnakhs",
        component: WeaponFetidBaghnakhs,
        meta: {
          title: "腐臭虎爪",
          icon: "https://terraria.wiki.gg/images/3/3f/Fetid_Baghnakhs.png",
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
      {
        title: "黃金雨",
        path: "/weapons/golden-shower",
        icon: "https://terraria.wiki.gg/images/0/08/Golden_Shower.png",
      },
      {
        title: "刃杖",
        path: "/weapons/blade-staff",
        icon: "https://terraria.wiki.gg/images/d/d8/Blade_Staff.png",
      },
      {
        title: "飛鏢步槍",
        path: "/weapons/dart-rifle",
        icon: "https://terraria.wiki.gg/images/6/69/Dart_Rifle.png",
      },
      {
        title: "腐臭虎爪",
        path: "/weapons/fetid-baghnakhs",
        icon: "https://terraria.wiki.gg/images/3/3f/Fetid_Baghnakhs.png",
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
