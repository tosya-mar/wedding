import { computed, ref, watch } from 'vue'
import { themeById, themes, type ThemeId } from '../data/themes'

const THEME_KEY = 'wedding:theme'
const ANIM_KEY = 'wedding:animations'

function initialTheme(): ThemeId {
  const fromUrl = new URLSearchParams(location.search).get('theme')
  if (fromUrl && themeById(fromUrl)) return fromUrl as ThemeId
  // Published site opens on «Навстречу друг другу».
  return 'meet'
}

function initialAnimations(): boolean {
  const saved = localStorage.getItem(ANIM_KEY)
  if (saved !== null) return saved === 'on'
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const themeId = ref<ThemeId>(initialTheme())
const animations = ref<boolean>(initialAnimations())

watch(
  themeId,
  (id) => {
    localStorage.setItem(THEME_KEY, id)
    const url = new URL(location.href)
    url.searchParams.set('theme', id)
    history.replaceState(null, '', url)
  },
  { immediate: true },
)

watch(
  animations,
  (on) => {
    localStorage.setItem(ANIM_KEY, on ? 'on' : 'off')
    document.documentElement.classList.toggle('anim-off', !on)
  },
  { immediate: true },
)

export function useSettings() {
  const theme = computed(() => themeById(themeId.value) ?? themes[0])
  const index = computed(() => themes.findIndex((t) => t.id === themeId.value))

  const step = (delta: number) => {
    const next = (index.value + delta + themes.length) % themes.length
    themeId.value = themes[next].id
  }

  return { themeId, theme, index, animations, step }
}
