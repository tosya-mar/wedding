<script setup lang="ts">
import { ref } from 'vue'
import { wedding, coupleShort } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Skyline from '../decor/Skyline.vue'
import DrawBridge from './DrawBridge.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const px = ref(0)
const py = ref(0)

function onMove(e: PointerEvent) {
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  px.value = ((e.clientX - r.left) / r.width - 0.5) * 2
  py.value = ((e.clientY - r.top) / r.height - 0.5) * 2
}
function onLeave() {
  px.value = 0
  py.value = 0
}

function wave(amp: number, len: number) {
  let d = `M0 ${amp} Q${len / 4} 0 ${len / 2} ${amp}`
  for (let x = len / 2; x < 440; x += len / 2) d += ` T${x + len / 2} ${amp}`
  return `${d} V60 H0Z`
}
const waves = [wave(10, 70), wave(12, 90), wave(9, 60)]
</script>

<template>
  <IntroShell
    name="papercut"
    :stage="stage"
    :leaving="leaving"
    hint="Бумажный Петербург"
    tap="Нажмите, чтобы свести мост"
    @skip="emit('open')"
  >
    <button
      type="button"
      class="paper"
      :style="{ '--px': px, '--py': py }"
      aria-label="Свести мост"
      @pointermove="onMove"
      @pointerleave="onLeave"
      @click="play([0, 1500], 1900)"
    >
      <span class="paper__layer paper__sky" style="--depth: 2">
        <i class="paper__sun" />
      </span>
      <span class="paper__layer" style="--depth: 4">
        <i class="paper__cloud paper__cloud--a" />
        <i class="paper__cloud paper__cloud--b" />
      </span>
      <span class="paper__layer" style="--depth: 6">
        <Skyline class="paper__city" />
      </span>
      <span class="paper__layer" style="--depth: 9">
        <svg class="paper__bridge" viewBox="0 0 400 300" aria-hidden="true">
          <DrawBridge :left="stage > 0 ? 0 : 58" :right="stage > 0 ? 0 : 58" />
        </svg>
      </span>
      <span v-for="(d, i) in waves" :key="i" class="paper__layer paper__wave-layer" :style="{ '--depth': 11 + i * 3 }">
        <svg class="paper__wave" :class="`paper__wave--${i}`" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
          <path :d="d" />
        </svg>
        <svg v-if="i === 1" class="paper__boat" viewBox="0 0 60 40" aria-hidden="true">
          <path d="M4 22 L56 22 L46 36 L14 36Z" fill="#ef8a74" />
          <path d="M30 2 L30 22 L12 22Z" fill="#f6efe3" />
          <path d="M30 6 L30 22 L46 22Z" fill="#e9b44c" />
        </svg>
      </span>
      <span class="paper__banner">
        <span class="paper__names">{{ coupleShort }}</span>
        <span class="paper__date">{{ wedding.dateShort }}</span>
      </span>
    </button>
  </IntroShell>
</template>
