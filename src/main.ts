import '@/styles/common.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { componentPlugin } from '@/components'

import App from './App.vue'
import router from './router'
import { setupDirectives } from './directives'
import './styles/element/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(componentPlugin)
setupDirectives(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
