<script setup lang="ts">
import { computed } from 'vue'
import { wedding, coupleShort } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import DrawBridge from './DrawBridge.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const angle = computed(() => (stage.value >= 2 ? 0 : 58))
const gears = [
  { x: 73, y: 246, r: 15, dir: 1 },
  { x: 95, y: 266, r: 10, dir: -1 },
  { x: 327, y: 246, r: 15, dir: -1 },
  { x: 305, y: 266, r: 10, dir: 1 },
]
</script>

<template>
  <IntroShell
    name="blueprint"
    :stage="stage"
    :leaving="leaving"
    hint="Чертёж разводного моста"
    tap="Потяните рычаг"
    @skip="emit('open')"
  >
    <button type="button" class="bp" aria-label="Потянуть рычаг и свести мост" @click="play([0, 600, 2000, 2900], 1600)">
      <svg class="bp__svg" viewBox="0 0 400 330" aria-hidden="true">
        <defs>
          <marker id="bp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10Z" fill="#fff" />
          </marker>
        </defs>
        <g class="bp__titleblock">
          <rect x="236" y="14" width="156" height="66" />
          <line x1="236" y1="32" x2="392" y2="32" />
          <line x1="236" y1="62" x2="392" y2="62" />
          <text x="244" y="27" class="bp__mono">ПРОЕКТ: СВАДЬБА</text>
          <text x="314" y="54" text-anchor="middle" class="bp__hand">{{ coupleShort }}</text>
          <text x="244" y="75" class="bp__mono">{{ wedding.dateShort }} · СПб</text>
        </g>
        <g class="bp__water">
          <line v-for="i in 6" :key="i" :x1="20 + (i % 2) * 30" :y1="206 + i * 12" :x2="380 - (i % 3) * 30" :y2="206 + i * 12" />
        </g>
        <g class="bp__angle">
          <path d="M150 204 A66 66 0 0 0 119 148" />
          <text x="156" y="176" class="bp__mono">{{ angle }}°</text>
        </g>
        <DrawBridge class="bp__bridge" :left="angle" :right="angle" />
        <g class="bp__dim">
          <line x1="84" y1="150" x2="316" y2="150" marker-start="url(#bp-arrow)" marker-end="url(#bp-arrow)" />
          <line x1="84" y1="144" x2="84" y2="186" />
          <line x1="316" y1="144" x2="316" y2="186" />
          <text x="200" y="143" text-anchor="middle" class="bp__mono">ВМЕСТЕ НАВСЕГДА</text>
        </g>
        <g v-for="(g, i) in gears" :key="i" class="bp__gear" :class="{ 'is-ccw': g.dir < 0 }">
          <circle :cx="g.x" :cy="g.y" :r="g.r" class="bp__teeth" />
          <circle :cx="g.x" :cy="g.y" :r="g.r - 4" />
          <circle :cx="g.x" :cy="g.y" r="2.5" />
        </g>
        <g class="bp__lever">
          <rect x="182" y="300" width="36" height="12" rx="2" />
          <g class="bp__handle">
            <line x1="200" y1="306" x2="200" y2="268" />
            <circle cx="200" cy="265" r="6" />
          </g>
        </g>
      </svg>
      <span class="bp__stamp">
        <b>Согласовано</b>
        <small>{{ wedding.monogram.left }} &amp; {{ wedding.monogram.right }} · 2027</small>
      </span>
    </button>
  </IntroShell>
</template>
