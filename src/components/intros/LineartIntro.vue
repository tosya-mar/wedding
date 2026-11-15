<script setup lang="ts">
import { computed } from 'vue'
import { wedding, coupleShort } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Skyline from '../decor/Skyline.vue'
import DrawBridge from './DrawBridge.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const angle = computed(() => (stage.value >= 2 ? 0 : 58))

const sparkles = [
  { x: 40, y: 60, s: 1 },
  { x: 120, y: 30, s: 0.7 },
  { x: 285, y: 40, s: 0.9 },
  { x: 360, y: 76, s: 0.6 },
  { x: 200, y: 110, s: 1.1 },
  { x: 70, y: 140, s: 0.6 },
  { x: 335, y: 150, s: 0.8 },
]
const star = 'M0 -6 Q0.8 -0.8 6 0 Q0.8 0.8 0 6 Q-0.8 0.8 -6 0 Q-0.8 -0.8 0 -6Z'
</script>

<template>
  <IntroShell
    name="lineart"
    :stage="stage"
    :leaving="leaving"
    hint="Золотой контур"
    tap="Нажмите, чтобы прорисовать мост"
    @skip="emit('open')"
  >
    <button type="button" class="lineart" aria-label="Прорисовать мост" @click="play([0, 1700, 2900], 1600)">
      <span class="lineart__frame" />
      <span class="lineart__title">
        <span class="lineart__names">{{ coupleShort }}</span>
        <span class="lineart__date">{{ wedding.dateShort }}</span>
      </span>
      <Skyline class="lineart__city" />
      <svg class="lineart__svg" viewBox="0 0 400 300" aria-hidden="true">
        <g class="lineart__sparkles">
          <path v-for="(p, i) in sparkles" :key="i" :d="star" :transform="`translate(${p.x} ${p.y}) scale(${p.s})`" />
        </g>
        <g class="lineart__water">
          <line x1="20" y1="214" x2="380" y2="214" />
          <line x1="60" y1="230" x2="180" y2="230" />
          <line x1="220" y1="230" x2="340" y2="230" />
          <line x1="110" y1="246" x2="290" y2="246" />
          <line x1="160" y1="262" x2="240" y2="262" />
        </g>
        <DrawBridge class="lineart__ghost" :left="angle" :right="angle" />
        <DrawBridge class="lineart__ink" :left="angle" :right="angle" />
      </svg>
    </button>
  </IntroShell>
</template>
