<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { coupleShort, wedding } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Confetti from './Confetti.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play, animations } = useIntro(() => emit('open'))

const FILL_MS = 1500
const progress = ref(0)
let holding = false
let raf = 0
let last = 0

function tick(now: number) {
  const dt = now - last
  last = now
  progress.value = Math.min(1, Math.max(0, progress.value + (holding ? dt / FILL_MS : -dt / (FILL_MS / 2))))
  if (progress.value >= 1) {
    play([0, 300], 1700)
    return
  }
  if (holding || progress.value > 0) raf = requestAnimationFrame(tick)
}

function start(e: PointerEvent) {
  if (stage.value > 0) return
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  if (!animations.value) {
    play([0])
    return
  }
  holding = true
  cancelAnimationFrame(raf)
  last = performance.now()
  raf = requestAnimationFrame(tick)
}
function stop() {
  holding = false
}

onBeforeUnmount(() => cancelAnimationFrame(raf))

const heartPath =
  'M50 90 C18 68 4 52 4 32 C4 16 16 6 30 6 C39 6 46 11 50 18 C54 11 61 6 70 6 C84 6 96 16 96 32 C96 52 82 68 50 90Z'
</script>

<template>
  <IntroShell
    name="heart"
    :stage="stage"
    :leaving="leaving"
    hint="Наполните сердце любовью"
    tap="Нажмите и удерживайте"
    @skip="emit('open')"
  >
    <button
      type="button"
      class="heart-hold"
      :class="{ 'is-holding': progress > 0 && stage === 0 }"
      :style="{ '--p': progress }"
      aria-label="Удерживайте, чтобы открыть"
      @pointerdown="start"
      @pointerup="stop"
      @pointercancel="stop"
      @pointerleave="stop"
      @contextmenu.prevent
      @keydown.enter="play([0, 300], 1700)"
    >
      <svg viewBox="0 0 100 96" aria-hidden="true">
        <defs>
          <clipPath id="heart-clip"><path :d="heartPath" /></clipPath>
        </defs>
        <path class="heart-hold__bg" :d="heartPath" />
        <g clip-path="url(#heart-clip)">
          <rect class="heart-hold__fill" x="0" :y="96 - progress * 96" width="100" height="96" />
          <path
            class="heart-hold__wave"
            :transform="`translate(0 ${90 - progress * 96})`"
            d="M0 6 Q12.5 0 25 6 T50 6 T75 6 T100 6 V14 H0Z"
          />
        </g>
        <path class="heart-hold__outline" :d="heartPath" />
      </svg>
      <span class="heart-hold__pct">{{ Math.round(progress * 100) }}%</span>
    </button>
    <p class="heart-hold__reveal">
      <span>{{ coupleShort }}</span>
      <small>{{ wedding.dateShort }}</small>
    </p>
    <Confetti v-if="stage >= 1" hearts :colors="['#8e1f35', '#e8a7a7', '#f3d6cf', '#c9a45c', '#fff']" />
  </IntroShell>
</template>
