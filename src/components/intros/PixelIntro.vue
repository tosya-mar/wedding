<script setup lang="ts">
import { wedding } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const colors: Record<string, string> = {
  h: '#3b2416',
  b: '#8a4b2a',
  s: '#ffcc99',
  e: '#2b1b4d',
  k: '#22223b',
  w: '#ffffff',
  r: '#ff5c8a',
  g: '#ffd23f',
  v: '#e6e6f0',
}

function sprite(rows: string[]) {
  const px: { x: number; y: number; c: string }[] = []
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (colors[ch]) px.push({ x, y, c: colors[ch] })
    }),
  )
  return { w: rows[0].length, h: rows.length, px }
}

const groom = sprite([
  '..hhhh..',
  '.hhhhhh.',
  '.hssssh.',
  '.sesses.',
  '.ssssss.',
  '..ssss..',
  '.kkwwkk.',
  'kkkwrkkk',
  'kkkwrkkk',
  'skkkkkks',
  '.kkkkkk.',
  '.kk..kk.',
  '.kk..kk.',
])
const bride = sprite([
  '..bbbb..',
  '.bbbbbbv',
  '.bssssbv',
  '.sesses.v',
  '.ssssss.v',
  '..ssss..',
  '.wwwwww.',
  'swwwwwws',
  '.wwrgww.',
  '.wwwwww.',
  'wwwwwwww',
  'wwwwwwww',
  'wwwwwwww',
])
const heart = sprite(['.rr.rr.', 'rrrrrrr', 'rrrrrrr', 'rrrrrrr', '.rrrrr.', '..rrr..', '...r...'])
const stars = Array.from({ length: 14 }, (_, i) => ({ x: (i * 37) % 100, y: (i * 23) % 60, d: (i % 5) * 0.3 }))
</script>

<template>
  <IntroShell
    name="pixel"
    :stage="stage"
    :leaving="leaving"
    hint="WEDDING QUEST"
    tap="Нажмите START"
    @skip="emit('open')"
  >
    <button type="button" class="px" aria-label="Начать игру" @click="play([0, 1700, 2700], 1800)">
      <span class="px__hud">
        <span>1P {{ wedding.groom.short.toUpperCase() }}</span>
        <span>HI 15082027</span>
        <span>2P {{ wedding.bride.short.toUpperCase() }}</span>
      </span>
      <span v-for="(s, i) in stars" :key="i" class="px__star" :style="{ left: s.x + '%', top: s.y + '%', animationDelay: s.d + 's' }" />
      <span class="px__start">PRESS START</span>
      <span class="px__levelup">LEVEL UP!</span>
      <span class="px__title">
        <span>{{ wedding.groom.short.toUpperCase() }} + {{ wedding.bride.short.toUpperCase() }}</span>
        <small>СВАДЬБА {{ wedding.dateShort }}</small>
      </span>
      <svg class="px__heart" :viewBox="`0 0 ${heart.w} ${heart.h}`" shape-rendering="crispEdges" aria-hidden="true">
        <rect v-for="(p, i) in heart.px" :key="i" :x="p.x" :y="p.y" width="1" height="1" :fill="p.c" />
      </svg>
      <span class="px__char px__char--g">
        <svg :viewBox="`0 0 ${groom.w} ${groom.h}`" shape-rendering="crispEdges" aria-hidden="true">
          <rect v-for="(p, i) in groom.px" :key="i" :x="p.x" :y="p.y" width="1" height="1" :fill="p.c" />
        </svg>
      </span>
      <span class="px__char px__char--b">
        <svg :viewBox="`0 0 ${bride.w + 1} ${bride.h}`" shape-rendering="crispEdges" aria-hidden="true">
          <rect v-for="(p, i) in bride.px" :key="i" :x="p.x" :y="p.y" width="1" height="1" :fill="p.c" />
        </svg>
      </span>
      <span class="px__ground" />
    </button>
  </IntroShell>
</template>
