// 通过插件的方式把components中的所组件都进行全局化注册
import type { App, Plugin } from 'vue'
import ImageView from './ImageView/index.vue'
import Sku from './Sku/index.vue'

export const componentPlugin: Plugin = {
  install(app: App) {
    // app.component('组件名字'，组件配置对象)
    app.component('ImageView', ImageView)
    app.component('SkuComponent', Sku)
  },
}
