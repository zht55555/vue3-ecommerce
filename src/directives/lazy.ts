import type { Directive } from 'vue'
import defaultImg from '@/assets/images/200.png'

type LazyImageElement = HTMLImageElement & {
  __imgLazyObserver?: IntersectionObserver
}

export const imgLazyDirective: Directive<LazyImageElement, string> = {
  mounted(el, binding) {
    el.src = defaultImg

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]

      if (!entry?.isIntersecting) {
        return
      }

      el.src = binding.value || defaultImg
      observer.unobserve(el)
      observer.disconnect()
      el.__imgLazyObserver = undefined
    })

    observer.observe(el)
    el.__imgLazyObserver = observer
  },
  unmounted(el) {
    el.__imgLazyObserver?.disconnect()
    el.__imgLazyObserver = undefined
  },
}
