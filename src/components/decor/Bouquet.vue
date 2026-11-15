<script setup lang="ts">
interface Flower {
  x: number
  y: number
  r: number
  petals: number
  rot: number
}

const flowers: Flower[] = [
  { x: 100, y: 78, r: 26, petals: 9, rot: 0 },
  { x: 62, y: 104, r: 17, petals: 7, rot: 20 },
  { x: 140, y: 100, r: 19, petals: 8, rot: 10 },
  { x: 84, y: 46, r: 11, petals: 6, rot: 5 },
]

const leaves = [
  { x: 40, y: 82, rot: -50, s: 1 },
  { x: 158, y: 74, rot: 45, s: 1.1 },
  { x: 128, y: 48, rot: 20, s: 0.8 },
  { x: 50, y: 130, rot: -110, s: 0.9 },
  { x: 152, y: 128, rot: 110, s: 0.9 },
  { x: 70, y: 66, rot: -25, s: 0.7 },
  { x: 118, y: 128, rot: 160, s: 0.7 },
]

const petalsOf = (f: Flower) =>
  Array.from({ length: f.petals }, (_, i) => (360 / f.petals) * i + f.rot)
</script>

<template>
  <svg class="bouquet" viewBox="0 0 200 200" aria-hidden="true">
    <g class="bouquet__stems" fill="none" stroke-linecap="round">
      <path d="M100 100 C98 140 96 165 92 196" />
      <path d="M64 108 C78 140 88 165 94 196" />
      <path d="M140 104 C122 140 106 170 98 196" />
      <path d="M84 50 C90 90 96 140 96 196" />
    </g>
    <g class="bouquet__leaves">
      <path
        v-for="(l, i) in leaves"
        :key="i"
        :transform="`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`"
        d="M0 0 C10 -10 30 -10 40 0 C30 10 10 10 0 0Z"
      />
    </g>
    <g v-for="(f, i) in flowers" :key="i" class="bouquet__flower" :transform="`translate(${f.x} ${f.y})`">
      <ellipse
        v-for="a in petalsOf(f)"
        :key="a"
        class="bouquet__petal"
        :rx="f.r * 0.45"
        :ry="f.r * 0.75"
        :transform="`rotate(${a}) translate(0 ${-f.r * 0.5})`"
      />
      <ellipse
        v-for="a in petalsOf(f)"
        :key="`in-${a}`"
        class="bouquet__petal bouquet__petal--inner"
        :rx="f.r * 0.28"
        :ry="f.r * 0.45"
        :transform="`rotate(${a + 180 / f.petals}) translate(0 ${-f.r * 0.28})`"
      />
      <circle class="bouquet__core" :r="f.r * 0.18" />
    </g>
  </svg>
</template>
