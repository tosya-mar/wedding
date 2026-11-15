<script setup lang="ts">
/** Drawbridge for a 400×300 viewBox: deck at y≈196, leaves hinge at x=84 and x=316. */
withDefaults(defineProps<{ left?: number; right?: number; lamps?: boolean; rails?: boolean }>(), {
  left: 58,
  right: 58,
  lamps: true,
  rails: true,
})

const postsL = [96, 120, 144, 168, 192]
const postsR = [208, 232, 256, 280, 304]
const lampsL = [104, 150, 190]
const lampsR = [210, 250, 296]
</script>

<template>
  <g class="db">
    <g class="db__static">
      <rect x="0" y="196" width="72" height="8" />
      <rect x="328" y="196" width="72" height="8" />
      <rect x="62" y="196" width="22" height="70" />
      <rect x="316" y="196" width="22" height="70" />
      <rect x="66" y="176" width="14" height="20" />
      <rect x="320" y="176" width="14" height="20" />
      <path d="M66 176 Q73 166 80 176Z M320 176 Q327 166 334 176Z" />
    </g>
    <g class="db__leaf db__leaf--l" :style="{ transform: `rotate(${-left}deg)`, transformOrigin: '84px 204px' }">
      <rect x="84" y="196" width="116" height="8" />
      <template v-if="rails">
        <rect x="84" y="188" width="116" height="1.6" />
        <rect v-for="x in postsL" :key="x" :x="x" y="188" width="1.4" height="8" />
      </template>
      <g v-if="lamps" class="db__lamps">
        <g v-for="x in lampsL" :key="x">
          <rect :x="x - 0.8" y="174" width="1.6" height="22" />
          <circle class="db__lamp" :cx="x" cy="173" r="3" />
        </g>
      </g>
      <slot name="left" />
    </g>
    <g class="db__leaf db__leaf--r" :style="{ transform: `rotate(${right}deg)`, transformOrigin: '316px 204px' }">
      <rect x="200" y="196" width="116" height="8" />
      <template v-if="rails">
        <rect x="200" y="188" width="116" height="1.6" />
        <rect v-for="x in postsR" :key="x" :x="x" y="188" width="1.4" height="8" />
      </template>
      <g v-if="lamps" class="db__lamps">
        <g v-for="x in lampsR" :key="x">
          <rect :x="x - 0.8" y="174" width="1.6" height="22" />
          <circle class="db__lamp" :cx="x" cy="173" r="3" />
        </g>
      </g>
      <slot name="right" />
    </g>
  </g>
</template>
