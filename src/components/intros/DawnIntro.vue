<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { wedding, coupleShort } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Skyline from '../decor/Skyline.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play, animations } = useIntro(() => emit('open'))

const value = ref(0)
const angle = computed(() => 58 * (1 - value.value / 100))
let raf = 0

function finish() {
  value.value = 100
  play([0, 900], 1600)
}

function onInput() {
  if (value.value >= 97) finish()
}

function autoClose() {
  if (stage.value > 0) return
  if (!animations.value) return finish()
  const from = value.value
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / 1000)
    value.value = from + (100 - from) * (1 - Math.pow(1 - t, 3))
    if (t < 1) raf = requestAnimationFrame(step)
    else finish()
  }
  raf = requestAnimationFrame(step)
}

onBeforeUnmount(() => cancelAnimationFrame(raf))

const lampsL = [104, 150, 190]
const lampsR = [210, 250, 296]
</script>

<template>
  <IntroShell
    name="dawn"
    :stage="stage"
    :leaving="leaving"
    hint="Сведите берега"
    tap="Сдвиньте ползунок вправо — или нажмите на мост"
    @skip="emit('open')"
  >
    <div class="dawn">
      <span class="dawn__title">
        <span class="dawn__names">{{ coupleShort }}</span>
        <span class="dawn__date">{{ wedding.dateShort }}</span>
      </span>
      <button type="button" class="dawn__scene" aria-label="Свести мост" @click="autoClose">
        <span class="dawn__sun" />
        <Skyline class="dawn__city" />
        <svg class="dawn__svg" viewBox="0 0 400 300" aria-hidden="true">
          <g class="dawn__gulls" fill="none" stroke-linecap="round">
            <path d="M60 70 q6 -6 12 0 q6 -6 12 0" />
            <path d="M100 52 q4 -4 8 0 q4 -4 8 0" />
            <path d="M300 84 q5 -5 10 0 q5 -5 10 0" />
          </g>
          <rect x="0" y="206" width="400" height="94" class="dawn__water" />
          <g class="dawn__ripples">
            <line x1="40" y1="232" x2="120" y2="232" />
            <line x1="230" y1="240" x2="330" y2="240" />
            <line x1="90" y1="256" x2="200" y2="256" />
            <line x1="260" y1="272" x2="370" y2="272" />
          </g>
          <g class="dawn__boat">
            <path d="M0 0 L26 0 L22 6 L4 6Z" />
            <path d="M13 -1 L13 -24 L24 -2Z" class="dawn__sail" />
          </g>
          <g class="dawn__static">
            <rect x="0" y="196" width="72" height="8" />
            <rect x="328" y="196" width="72" height="8" />
            <rect x="62" y="196" width="22" height="70" />
            <rect x="316" y="196" width="22" height="70" />
            <rect x="66" y="176" width="14" height="20" />
            <rect x="320" y="176" width="14" height="20" />
            <path d="M66 176 Q73 166 80 176Z M320 176 Q327 166 334 176Z" />
          </g>
          <g class="dawn__leaf" :style="{ transform: `rotate(${-angle}deg)`, transformOrigin: '84px 204px' }">
            <rect x="84" y="196" width="116" height="8" />
            <rect x="84" y="188" width="116" height="1.6" />
            <rect v-for="x in [96, 120, 144, 168, 192]" :key="x" :x="x" y="188" width="1.4" height="8" />
            <g v-for="x in lampsL" :key="'l' + x">
              <rect :x="x - 0.8" y="174" width="1.6" height="22" />
              <circle :cx="x" cy="173" r="3" />
            </g>
          </g>
          <g class="dawn__leaf" :style="{ transform: `rotate(${angle}deg)`, transformOrigin: '316px 204px' }">
            <rect x="200" y="196" width="116" height="8" />
            <rect x="200" y="188" width="116" height="1.6" />
            <rect v-for="x in [208, 232, 256, 280, 304]" :key="x" :x="x" y="188" width="1.4" height="8" />
            <g v-for="x in lampsR" :key="'r' + x">
              <rect :x="x - 0.8" y="174" width="1.6" height="22" />
              <circle :cx="x" cy="173" r="3" />
            </g>
          </g>
        </svg>
      </button>
      <label class="dawn__slider">
        <span class="visually-hidden">Свести мост</span>
        <input
          v-model.number="value"
          type="range"
          min="0"
          max="100"
          step="1"
          :style="{ '--v': value + '%' }"
          :disabled="stage > 0"
          @input="onInput"
        />
      </label>
    </div>
  </IntroShell>
</template>
