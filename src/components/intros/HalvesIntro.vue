<script setup lang="ts">
import { computed, ref } from 'vue'
import { wedding } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Confetti from './Confetti.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const GAP = 56
const pull = ref(0)
let drag: { side: 'l' | 'r'; x: number; moved: boolean } | null = null

const offset = computed(() => (stage.value > 0 ? 0 : Math.max(0, GAP - pull.value)))

function join() {
  pull.value = GAP
  play([0, 500], 1800)
}

function down(side: 'l' | 'r', e: PointerEvent) {
  if (stage.value > 0) return
  drag = { side, x: e.clientX, moved: false }
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}
function move(e: PointerEvent) {
  if (!drag) return
  const dx = (e.clientX - drag.x) * (drag.side === 'l' ? 1 : -1)
  if (Math.abs(dx) > 4) drag.moved = true
  pull.value = Math.max(0, Math.min(GAP, dx * 1.4))
  if (pull.value >= GAP - 10) {
    drag = null
    join()
  }
}
function up() {
  if (!drag) return
  const tapped = !drag.moved
  drag = null
  if (tapped) join()
  else pull.value = 0
}

const left =
  'M50 90 C18 68 4 52 4 32 C4 16 16 6 30 6 C39 6 46 11 50 18 L46 30 L54 42 L46 54 L54 66 L46 78 Z'
const right =
  'M50 18 C54 11 61 6 70 6 C84 6 96 16 96 32 C96 52 82 68 50 90 L46 78 L54 66 L46 54 L54 42 L46 30 Z'
</script>

<template>
  <IntroShell
    name="halves"
    :stage="stage"
    :leaving="leaving"
    hint="Две половинки одного целого"
    tap="Сдвиньте половинки друг к другу или нажмите на них"
    @skip="emit('open')"
  >
    <div class="halves" :class="{ 'is-dragging': pull > 0 && stage === 0 }">
      <div class="halves__heart">
        <svg
          class="halves__half halves__half--l"
          viewBox="0 0 100 96"
          :style="{ transform: `translateX(${-offset}px) rotate(${-offset / 5}deg)` }"
          role="button"
          aria-label="Половинка Вани"
          @pointerdown="down('l', $event)"
          @pointermove="move"
          @pointerup="up"
          @pointercancel="up"
        >
          <defs>
            <linearGradient id="halves-l" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#ff8f86" />
              <stop offset="1" stop-color="#e2475a" />
            </linearGradient>
          </defs>
          <path :d="left" fill="url(#halves-l)" />
        </svg>
        <svg
          class="halves__half halves__half--r"
          viewBox="0 0 100 96"
          :style="{ transform: `translateX(${offset}px) rotate(${offset / 5}deg)` }"
          role="button"
          aria-label="Половинка Тоси"
          @pointerdown="down('r', $event)"
          @pointermove="move"
          @pointerup="up"
          @pointercancel="up"
        >
          <defs>
            <linearGradient id="halves-r" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#ffb199" />
              <stop offset="1" stop-color="#e8656b" />
            </linearGradient>
          </defs>
          <path :d="right" fill="url(#halves-r)" />
        </svg>
        <span class="halves__glow" />
      </div>
      <div class="halves__labels">
        <span :style="{ transform: `translateX(${-offset}px)` }">{{ wedding.groom.short }}</span>
        <span class="halves__amp">&amp;</span>
        <span :style="{ transform: `translateX(${offset}px)` }">{{ wedding.bride.short }}</span>
      </div>
      <p class="halves__date">{{ wedding.dateShort }}</p>
    </div>
    <Confetti v-if="stage >= 1" hearts :colors="['#e8656b', '#ffb199', '#ffd2c2', '#fff', '#f4a3a0']" />
  </IntroShell>
</template>
