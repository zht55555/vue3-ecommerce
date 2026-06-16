import type { App } from 'vue'
import { imgLazyDirective } from './lazy'

export const setupDirectives = (app: App) => {
  app.directive('img-lazy', imgLazyDirective)
}
