<script setup lang="ts">
import { reactive, ref } from 'vue'
import { wedding, coupleShort } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Skyline from '../decor/Skyline.vue'
import DrawBridge from './DrawBridge.vue'
import Confetti from './Confetti.vue'

type Side = 'l' | 'r'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const MAX = 58
const angle = reactive<Record<Side, number>>({ l: MAX, r: MAX })
const dragging = ref(false)
let drag: { side: Side; y: number; from: number; moved: boolean } | null = null

function checkDone() {
  if (angle.l <= 4 && angle.r <= 4) {
    angle.l = 0
    angle.r = 0
    play([0, 700], 1900)
  }
}

function down(e: PointerEvent) {
  if (stage.value > 0) return
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  const side: Side = e.clientX - r.left < r.width / 2 ? 'l' : 'r'
  drag = { side, y: e.clientY, from: angle[side], moved: false }
  el.setPointerCapture(e.pointerId)
}
function move(e: PointerEvent) {
  if (!drag) return
  const dy = e.clientY - drag.y
  if (Math.abs(dy) > 4) {
    drag.moved = true
    dragging.value = true
  }
  angle[drag.side] = Math.max(0, Math.min(MAX, drag.from - dy * 0.6))
}
function up() {
  if (!drag) return
  const { side, moved } = drag
  drag = null
  dragging.value = false
  if (!moved || angle[side] < 14) angle[side] = 0
  checkDone()
}

const flowersL = [92, 108, 124, 140, 156, 172, 188]
const flowersR = [212, 228, 244, 260, 276, 292, 308]
const swag = (a: number, b: number) => {
  const mid = (a + b) / 2
  return `M${a} 190 Q${(a + mid) / 2} 199 ${mid} 191 Q${(mid + b) / 2} 199 ${b} 190`
}
</script>

<template>
  <IntroShell
    name="garland"
    :stage="stage"
    :leaving="leaving"
    hint="Мост в цветах"
    tap="Опустите каждую половину моста — потяните вниз или нажмите"
    @skip="emit('open')"
  >
    <div class="garland">
      <span class="garland__title">
        <span class="garland__names">{{ coupleShort }}</span>
        <span class="garland__date">{{ wedding.dateShort }}</span>
      </span>
      <div
        class="garland__scene"
        :class="{ 'is-dragging': dragging }"
        role="button"
        aria-label="Опустить половины моста"
        @pointerdown="down"
        @pointermove="move"
        @pointerup="up"
        @pointercancel="up"
      >
        <Skyline class="garland__city" />
        <svg class="garland__svg" viewBox="0 0 400 300" aria-hidden="true">
          <rect x="0" y="206" width="400" height="94" class="garland__water" />
          <g class="garland__ripples">
            <line x1="30" y1="232" x2="120" y2="232" />
            <line x1="240" y1="240" x2="350" y2="240" />
            <line x1="110" y1="258" x2="220" y2="258" />
          </g>
          <DrawBridge :left="angle.l" :right="angle.r" :lamps="false">
            <template #left>
              <path :d="swag(84, 142)" class="garland__vine" />
              <path :d="swag(142, 200)" class="garland__vine" />
              <g v-for="(x, i) in flowersL" :key="x">
                <circle :cx="x" cy="188" r="4.4" :class="i % 2 ? 'garland__fl-b' : 'garland__fl-a'" />
                <circle :cx="x" cy="188" r="1.5" class="garland__core" />
              </g>
            </template>
            <template #right>
              <path :d="swag(200, 258)" class="garland__vine" />
              <path :d="swag(258, 316)" class="garland__vine" />
              <g v-for="(x, i) in flowersR" :key="x">
                <circle :cx="x" cy="188" r="4.4" :class="i % 2 ? 'garland__fl-a' : 'garland__fl-b'" />
                <circle :cx="x" cy="188" r="1.5" class="garland__core" />
              </g>
            </template>
          </DrawBridge>
          <g class="garland__wreath">
            <circle cx="200" cy="150" r="20" class="garland__wreath-ring" />
            <circle v-for="i in 12" :key="i" :cx="200 + 20 * Math.cos((i * Math.PI) / 6)" :cy="150 + 20 * Math.sin((i * Math.PI) / 6)" r="3.6" :class="i % 3 ? 'garland__fl-a' : 'garland__fl-b'" />
            <text x="200" y="156" text-anchor="middle" class="garland__mono">{{ wedding.monogram.left }}&amp;{{ wedding.monogram.right }}</text>
          </g>
        </svg>
        <span class="garland__arrow garland__arrow--l" :class="{ 'is-done': angle.l === 0 }">↓</span>
        <span class="garland__arrow garland__arrow--r" :class="{ 'is-done': angle.r === 0 }">↓</span>
      </div>
    </div>
    <Confetti v-if="stage >= 1" :colors="['#f3cfc6', '#c98b8b', '#fff', '#e9d7a8', '#8aa27a']" />
  </IntroShell>
</template>
