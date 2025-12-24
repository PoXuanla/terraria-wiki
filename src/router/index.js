import { createRouter, createWebHistory } from 'vue-router'
import { Home, BookOpen, Crosshair, FileText, Skull } from 'lucide-vue-next'

/**
 * 路由配置
 * 使用 Lazy Loading 方式引入頁面組件
 */

// 佈局組件
const MainLayout = () => import('@/layouts/MainLayout.vue')

// 頁面組件 (Lazy Loading)
const GuideMimic = () => import('@/views/guides/MimicGuide.vue')
const GuideClentaminator = () => import('@/views/guides/ClentaminatorGuide.vue')
const GuideMimicDoc = () => import('@/views/guides/MimicHuntingDoc.vue')
const WeaponDaedalus = () => import('@/views/weapons/DaedalusStormbow.vue')
const BossTheTwins = () => import('@/views/boss/TheTwins.vue')

/**
 * 路由表
 */
const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/guides/mimic',
    meta: {
      title: '首頁',
      icon: Home,
    },
    children: [
      // ==========================================
      // 指南 (Guides)
      // ==========================================
      {
        path: 'guides/mimic',
        name: 'GuideMimic',
        component: GuideMimic,
        meta: {
          title: '寶藏怪狩獵指南',
          icon: 'https://terraria.wiki.gg/images/f/f5/Mimic.png',
          group: 'guides',
        },
      },
      {
        path: 'guides/clentaminator',
        name: 'GuideClentaminator',
        component: GuideClentaminator,
        meta: {
          title: '環境治理指南',
          icon: 'https://terraria.wiki.gg/images/9/9b/Clentaminator.png',
          group: 'guides',
        },
      },
      {
        path: 'guides/mimic-doc',
        name: 'GuideMimicDoc',
        component: GuideMimicDoc,
        meta: {
          title: '寶箱怪指南 (文檔版)',
          icon: FileText,
          group: 'guides',
        },
      },
      
      // ==========================================
      // 武器 (Weapons)
      // ==========================================
      {
        path: 'weapons/daedalus',
        name: 'WeaponDaedalus',
        component: WeaponDaedalus,
        meta: {
          title: '代達羅斯風暴弓',
          icon: 'https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png',
          group: 'weapons',
        },
      },

      // ==========================================
      // BOSS
      // ==========================================
      {
        path: 'boss/the-twins',
        name: 'BossTheTwins',
        component: BossTheTwins,
        meta: {
          title: '機械魔眼 (The Twins)',
          icon: 'https://terraria.wiki.gg/images/5/55/Retinazer.png',
          group: 'boss',
        },
      },
    ],
  },
  
  // 404 頁面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '頁面不存在',
    },
  },
]

/**
 * 建立路由實例
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

/**
 * 側邊欄選單配置
 * 導出供 Sidebar 組件使用
 */
export const menuConfig = [
  {
    group: '指南',
    groupKey: 'guides',
    icon: BookOpen,
    items: [
      { 
        title: '寶藏怪狩獵指南', 
        path: '/guides/mimic', 
        icon: 'https://terraria.wiki.gg/images/f/f5/Mimic.png',
      },
      { 
        title: '環境治理指南', 
        path: '/guides/clentaminator', 
        icon: 'https://terraria.wiki.gg/images/9/9b/Clentaminator.png',
      },
      { 
        title: '寶箱怪指南 (文檔版)', 
        path: '/guides/mimic-doc', 
        icon: FileText,
      },
    ],
  },
  {
    group: '武器',
    groupKey: 'weapons',
    icon: Crosshair,
    items: [
      { 
        title: '代達羅斯風暴弓', 
        path: '/weapons/daedalus', 
        icon: 'https://terraria.wiki.gg/images/e/e6/Daedalus_Stormbow.png',
      },
    ],
  },
  {
    group: 'BOSS',
    groupKey: 'boss',
    icon: Skull,
    items: [
      { 
        title: '機械魔眼 (The Twins)', 
        path: '/boss/the-twins', 
        icon: 'https://terraria.wiki.gg/images/5/55/Retinazer.png',
      },
    ],
  },
]

export default router
