import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 全域樣式
import './assets/base.css'

// 建立 Vue 應用實例
const app = createApp(App)

// 使用 Pinia 狀態管理
app.use(createPinia())

// 使用 Vue Router
app.use(router)

// 掛載應用
app.mount('#app')
