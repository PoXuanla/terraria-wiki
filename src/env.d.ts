/// <reference types="vite/client" />

/**
 * 声明所有 .vue 文件为模块
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * 扩展 ImportMeta 接口以支持 Vite 特性
 */
interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  // 添加其他环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  /**
   * Vite 提供的 glob 导入功能
   */
  glob<T = any>(
    pattern: string | string[],
    options?: {
      eager?: boolean
      import?: string
      as?: string
    }
  ): Record<string, T>
}

