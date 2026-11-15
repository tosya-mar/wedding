<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { themes } from '../data/themes'
import { useSettings } from '../composables/useSettings'

const { themeId, theme, index, animations, step } = useSettings()
const open = ref(false)

const groups = [
  { title: 'Классические', items: themes.filter((t) => !t.group) },
  { title: 'Конверты', items: themes.filter((t) => t.group === 'envelope') },
  { title: 'Разводные мосты', items: themes.filter((t) => t.group === 'bridge') },
  { title: 'Сердца', items: themes.filter((t) => t.group === 'heart') },
  { title: 'Для программистов', items: themes.filter((t) => t.group === 'code') },
]

function pick(id: (typeof themes)[number]['id']) {
  themeId.value = id
  open.value = false
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
}

function prev() {
  step(-1)
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
}
function next() {
  step(1)
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="switcher" :class="{ 'is-open': open }">
    <Transition name="sheet">
      <div v-if="open" class="switcher__sheet" role="dialog" aria-label="Выбор дизайна">
        <div class="switcher__sheet-head">
          <span>Выберите дизайн</span>
          <button type="button" class="switcher__close" aria-label="Закрыть" @click="open = false">×</button>
        </div>
        <template v-for="group in groups" :key="group.title">
          <p class="switcher__group">{{ group.title }}</p>
          <ul class="switcher__grid">
            <li v-for="t in group.items" :key="t.id">
              <button
                type="button"
                class="switcher__card"
                :class="{ 'is-active': t.id === themeId }"
                @click="pick(t.id)"
              >
                <span class="switcher__sw">
                  <i v-for="c in t.swatch" :key="c" :style="{ background: c }" />
                </span>
                <span class="switcher__card-name">{{ themes.indexOf(t) + 1 }}. {{ t.name }}</span>
                <span class="switcher__card-hint">{{ t.hint }}</span>
              </button>
            </li>
          </ul>
        </template>
        <label class="switcher__anim">
          <span>Анимации</span>
          <input v-model="animations" type="checkbox" role="switch" />
          <span class="switcher__toggle" />
        </label>
      </div>
    </Transition>

    <div class="switcher__bar">
      <button type="button" class="switcher__arrow" aria-label="Предыдущий дизайн" @click="prev">‹</button>
      <button type="button" class="switcher__current" :aria-expanded="open" @click="open = !open">
        <span class="switcher__sw switcher__sw--sm">
          <i v-for="c in theme.swatch" :key="c" :style="{ background: c }" />
        </span>
        <span class="switcher__label">
          <small>Дизайн {{ index + 1 }} из {{ themes.length }}</small>
          {{ theme.name }}
        </span>
      </button>
      <button type="button" class="switcher__arrow" aria-label="Следующий дизайн" @click="next">›</button>
      <button
        type="button"
        class="switcher__motion"
        :class="{ 'is-off': !animations }"
        :aria-pressed="animations"
        :title="animations ? 'Выключить анимации' : 'Включить анимации'"
        @click="animations = !animations"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
          <line v-if="!animations" x1="3" y1="21" x2="21" y2="3" />
        </svg>
      </button>
    </div>
  </div>
</template>
