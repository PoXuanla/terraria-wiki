import { createRouter, createWebHistory } from 'vue-router'

/**
 * 路由配置
 * 使用 Lazy Loading 方式引入頁面組件
 */

// 佈局組件
const MainLayout = () => import('@/layouts/MainLayout.vue')

// 頁面組件 (Lazy Loading)
const GuideMimic = () => import('@/views/guides/MimicGuide.vue')
const GuideClentaminator = () => import('@/views/guides/ClentaminatorGuide.vue')
const WeaponDaedalus = () => import('@/views/weapons/DaedalusStormbow.vue')

/**
 * 路由表
 */
const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/guides/mimic',
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
          icon: 'treasure',
          group: 'guides',
        },
      },
      {
        path: 'guides/clentaminator',
        name: 'GuideClentaminator',
        component: GuideClentaminator,
        meta: {
          title: '環境治理指南',
          icon: 'environment',
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
          icon: 'bow',
          group: 'weapons',
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
    icon: '📖',
    items: [
      { title: '寶藏怪狩獵指南', path: '/guides/mimic', icon: '💎' },
      { title: '環境治理指南', path: '/guides/clentaminator', icon: '🌿' },
    ],
  },
  {
    group: '武器',
    groupKey: 'weapons',
    icon: '⚔️',
    items: [
      { title: '代達羅斯風暴弓', path: '/weapons/daedalus', icon: '🏹' },
    ],
  },
]

export default router

