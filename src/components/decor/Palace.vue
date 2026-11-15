<script setup lang="ts">
/** Silhouette of Дворец бракосочетания № 1, Angliyskaya nab. 28 */
</script>

<template>
  <svg class="palace" viewBox="0 0 320 168" fill="currentColor" aria-hidden="true">
    <!-- side buildings (context of the embankment) -->
    <g opacity="0.35">
      <rect x="0" y="58" width="42" height="96" />
      <rect x="8" y="68" width="8" height="14" />
      <rect x="22" y="68" width="8" height="14" />
      <rect x="8" y="92" width="8" height="14" />
      <rect x="22" y="92" width="8" height="14" />
      <rect x="8" y="116" width="8" height="14" />
      <rect x="22" y="116" width="8" height="14" />
      <rect x="278" y="42" width="42" height="112" />
      <rect x="288" y="54" width="8" height="14" />
      <rect x="302" y="54" width="8" height="14" />
      <rect x="288" y="80" width="8" height="14" />
      <rect x="302" y="80" width="8" height="14" />
      <rect x="288" y="106" width="8" height="14" />
      <rect x="302" y="106" width="8" height="14" />
      <rect x="288" y="130" width="8" height="14" />
      <rect x="302" y="130" width="8" height="14" />
    </g>

    <!-- main palace body -->
    <rect x="46" y="48" width="228" height="106" class="palace__wall" />

    <!-- cornice stack -->
    <rect x="42" y="42" width="236" height="8" />
    <rect x="48" y="34" width="224" height="8" opacity="0.85" />
    <rect x="54" y="28" width="212" height="6" opacity="0.7" />

    <!-- central attic / roof accent -->
    <path d="M140 12 L160 2 L180 12 V28 H140Z" />
    <rect x="152" y="12" width="16" height="16" opacity="0.55" />

    <!-- upper windows with arched tops + pediments (2nd floor) -->
    <g class="palace__windows">
      <template v-for="x in [62, 98, 134, 170, 206, 242]" :key="'u' + x">
        <!-- pediment -->
        <path :d="`M${x - 2} 58 H${x + 18} L${x + 8} 50Z`" opacity="0.95" />
        <!-- arched window -->
        <path :d="`M${x} 60 H${x + 16} V78 A8 8 0 0 1 ${x} 78Z`" />
      </template>
    </g>

    <!-- balcony over the entrance -->
    <rect x="142" y="92" width="36" height="6" />
    <path d="M140 98 H180 V104 H140Z" />
    <g opacity="0.95">
      <rect v-for="x in [144, 150, 156, 162, 168, 174]" :key="'r' + x" :x="x" y="98" width="1.8" height="6" />
    </g>
    <!-- balcony brackets -->
    <path d="M144 104 L148 110 L152 104Z M168 104 L172 110 L176 104Z" opacity="0.8" />

    <!-- rusticated ground floor -->
    <rect x="46" y="110" width="228" height="44" opacity="0.32" />
    <g opacity="0.45" fill="none" stroke="currentColor" stroke-width="1.2">
      <line x1="46" y1="120" x2="274" y2="120" />
      <line x1="46" y1="130" x2="274" y2="130" />
      <line x1="46" y1="140" x2="274" y2="140" />
      <line v-for="x in [70, 100, 130, 190, 220, 250]" :key="'v' + x" :x1="x" y1="110" :x2="x" y2="154" />
    </g>

    <!-- entrance portal with arch -->
    <path d="M148 104 H172 V154 H148Z" class="palace__door" />
    <path d="M150 106 H170 V128 A10 12 0 0 1 150 128Z" opacity="0.55" />

    <!-- ground-floor windows -->
    <g class="palace__windows">
      <rect v-for="x in [62, 98, 206, 242]" :key="'g' + x" :x="x" y="118" width="16" height="22" />
    </g>

    <!-- pavement -->
    <rect x="20" y="154" width="280" height="6" />
    <rect x="10" y="160" width="300" height="4" opacity="0.45" />
  </svg>
</template>
