<script setup lang="ts">
import { wedding, coupleShort } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Skyline from '../decor/Skyline.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const fireworks = [
  { x: 22, y: 14, c: '#ffd27a', d: 0 },
  { x: 74, y: 10, c: '#ff6b6b', d: 0.35 },
  { x: 50, y: 4, c: '#ffffff', d: 0.7 },
  { x: 30, y: 26, c: '#ff9e5e', d: 1.05 },
  { x: 80, y: 28, c: '#ffd27a', d: 1.3 },
]
</script>

<template>
  <IntroShell
    name="sails"
    :stage="stage"
    :leaving="leaving"
    hint="Алые паруса над Невой"
    tap="Нажмите, чтобы корабль отправился в путь"
    @skip="emit('open')"
  >
    <button type="button" class="sails" aria-label="Запустить корабль" @click="play([0, 1900, 3600], 1700)">
      <span class="sails__title">
        <span class="sails__names">{{ coupleShort }}</span>
        <span class="sails__date">{{ wedding.dateShort }}</span>
      </span>
      <span class="sails__fireworks" aria-hidden="true">
        <span
          v-for="(f, i) in fireworks"
          :key="i"
          class="sails__fw"
          :style="{ left: f.x + '%', top: f.y + '%', '--c': f.c, animationDelay: f.d + 's' }"
        >
          <i v-for="n in 12" :key="n" :style="{ '--a': n * 30 + 'deg', animationDelay: f.d + 's' }" />
        </span>
      </span>
      <Skyline class="sails__city" />
      <svg class="sails__svg" viewBox="0 0 400 300" aria-hidden="true">
        <defs>
          <linearGradient id="sails-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#3a1f3d" />
            <stop offset="1" stop-color="#0d1426" />
          </linearGradient>
          <linearGradient id="sails-sail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#ff4a4a" />
            <stop offset="1" stop-color="#b3202a" />
          </linearGradient>
        </defs>
        <rect x="0" y="206" width="400" height="94" fill="url(#sails-water)" />
        <g class="sails__glitter">
          <rect v-for="i in 9" :key="i" :x="150 + i * 12" :y="214 + (i % 3) * 14" width="18" height="1.6" rx="0.8" />
        </g>
        <g class="sails__ship">
          <g class="sails__bob">
            <path class="sails__hull" d="M-50 0 L50 0 L40 14 L-42 14Z" />
            <rect class="sails__mast" x="-21" y="-86" width="2" height="86" />
            <rect class="sails__mast" x="13" y="-76" width="2" height="76" />
            <path
              d="M-33 -72 Q-20 -76 -7 -72 Q-4 -60 -7 -48 Q-20 -51 -33 -48 Q-36 -60 -33 -72Z M-37 -44 Q-20 -48 -3 -44 Q0 -28 -3 -12 Q-20 -15 -37 -12 Q-40 -28 -37 -44Z"
              fill="url(#sails-sail)"
            />
            <path
              d="M4 -64 Q14 -67 24 -64 Q27 -54 24 -44 Q14 -46 4 -44 Q1 -54 4 -64Z M1 -40 Q14 -43 27 -40 Q30 -26 27 -12 Q14 -14 1 -12 Q-2 -26 1 -40Z"
              fill="url(#sails-sail)"
            />
            <path d="M-20 -86 L-20 -80 L-10 -83Z M14 -76 L14 -70 L22 -73Z" fill="#ffd27a" />
            <path d="M-46 -2 L-21 -86 M50 -2 L15 -76" class="sails__rope" />
          </g>
        </g>
        <g class="sails__static">
          <rect x="0" y="196" width="72" height="8" />
          <rect x="328" y="196" width="72" height="8" />
          <rect x="62" y="196" width="22" height="70" />
          <rect x="316" y="196" width="22" height="70" />
          <rect x="66" y="176" width="14" height="20" />
          <rect x="320" y="176" width="14" height="20" />
        </g>
        <g class="sails__leaf sails__leaf--l">
          <rect x="84" y="196" width="116" height="8" />
          <rect x="84" y="188" width="116" height="1.6" />
          <rect v-for="x in [96, 120, 144, 168, 192]" :key="x" :x="x" y="188" width="1.4" height="8" />
        </g>
        <g class="sails__leaf sails__leaf--r">
          <rect x="200" y="196" width="116" height="8" />
          <rect x="200" y="188" width="116" height="1.6" />
          <rect v-for="x in [208, 232, 256, 280, 304]" :key="x" :x="x" y="188" width="1.4" height="8" />
        </g>
      </svg>
    </button>
  </IntroShell>
</template>
