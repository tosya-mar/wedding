import type { Directive } from 'vue'

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      )
    : null

/** v-reveal="'up' | 'left' | 'right' | 'zoom' | 'fade'" — the effect itself lives in base.css. */
export const vReveal: Directive<HTMLElement, string | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal', `reveal--${binding.value ?? 'up'}`)
    if (!observer) {
      el.classList.add('is-visible')
      return
    }
    observer.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}
