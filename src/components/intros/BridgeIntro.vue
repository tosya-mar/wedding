<script setup lang="ts">
import { wedding, coupleShort } from '../../data/wedding'
import { useIntro } from '../../composables/useIntro'
import IntroShell from './IntroShell.vue'
import Skyline from '../decor/Skyline.vue'

const emit = defineEmits<{ open: [] }>()
const { stage, leaving, play } = useIntro(() => emit('open'))

const stars = [
  [30, 30], [80, 60], [140, 22], [190, 70], [250, 34], [370, 40], [60, 110], [220, 110], [300, 100], [350, 130],
]
const lampsL = [104, 150, 190]
const lampsR = [210, 250, 296]
</script>

<template>
  <IntroShell
    name="bridge"
    :stage="stage"
    :leaving="leaving"
    hint="Разводной мост над Невой"
    tap="Нажмите, чтобы свести мост"
    @skip="emit('open')"
  >
    <button type="button" class="bridge" aria-label="Свести мост" @click="play([0, 1500], 1600)">
      <span class="bridge__title">
        <span class="bridge__names">{{ coupleShort }}</span>
        <span class="bridge__date">{{ wedding.dateShort }}</span>
      </span>
      <Skyline class="bridge__city" />
      <svg class="bridge__svg" viewBox="0 0 400 300" aria-hidden="true">
        <defs>
          <linearGradient id="bridge-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#1c3a55" />
            <stop offset="1" stop-color="#0b1824" />
          </linearGradient>
        </defs>
        <circle class="bridge__moon" cx="330" cy="58" r="18" />
        <circle v-for="([x, y], i) in stars" :key="i" class="bridge__star" :cx="x" :cy="y" r="1.3" :style="{ animationDelay: i * 0.3 + 's' }" />
        <rect x="0" y="206" width="400" height="94" fill="url(#bridge-water)" />
        <g class="bridge__ripples">
          <line x1="40" y1="232" x2="120" y2="232" />
          <line x1="230" y1="240" x2="330" y2="240" />
          <line x1="90" y1="256" x2="200" y2="256" />
          <line x1="260" y1="270" x2="370" y2="270" />
        </g>
        <g class="bridge__reflect">
          <rect v-for="x in [...lampsL, ...lampsR]" :key="'r' + x" :x="x - 1.5" y="214" width="3" height="40" rx="1.5" />
        </g>
        <g class="bridge__static">
          <rect x="0" y="196" width="72" height="8" />
          <rect x="328" y="196" width="72" height="8" />
          <rect x="62" y="196" width="22" height="70" />
          <rect x="316" y="196" width="22" height="70" />
          <rect x="66" y="176" width="14" height="20" />
          <rect x="320" y="176" width="14" height="20" />
          <path d="M66 176 Q73 166 80 176Z M320 176 Q327 166 334 176Z" />
        </g>
        <g class="bridge__leaf bridge__leaf--l">
          <rect x="84" y="196" width="116" height="8" />
          <rect x="84" y="188" width="116" height="1.6" />
          <rect v-for="x in [96, 120, 144, 168, 192]" :key="x" :x="x" y="188" width="1.4" height="8" />
          <g v-for="x in lampsL" :key="'l' + x">
            <rect :x="x - 0.8" y="174" width="1.6" height="22" />
            <circle class="bridge__lamp" :cx="x" cy="173" r="3" />
          </g>
        </g>
        <g class="bridge__leaf bridge__leaf--r">
          <rect x="200" y="196" width="116" height="8" />
          <rect x="200" y="188" width="116" height="1.6" />
          <rect v-for="x in [208, 232, 256, 280, 304]" :key="x" :x="x" y="188" width="1.4" height="8" />
          <g v-for="x in lampsR" :key="'r' + x">
            <rect :x="x - 0.8" y="174" width="1.6" height="22" />
            <circle class="bridge__lamp" :cx="x" cy="173" r="3" />
          </g>
        </g>
      </svg>
    </button>
  </IntroShell>
</template>
