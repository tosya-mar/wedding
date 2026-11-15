<script setup lang="ts">
defineProps<{ water?: boolean }>()
</script>

<template>
  <svg class="skyline" viewBox="0 0 400 140" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <g class="skyline__city" fill="currentColor">
      <!-- background houses -->
      <rect x="0" y="106" width="30" height="14" />
      <rect x="6" y="100" width="12" height="8" />
      <rect x="82" y="104" width="12" height="16" />
      <rect x="262" y="108" width="18" height="12" />
      <rect x="360" y="104" width="40" height="16" />
      <rect x="372" y="98" width="14" height="8" />

      <!-- Peter and Paul Cathedral -->
      <rect x="30" y="100" width="50" height="20" />
      <rect x="46" y="72" width="14" height="28" />
      <rect x="48" y="58" width="10" height="14" />
      <path d="M48 58 Q53 50 58 58Z" />
      <polygon points="51.6,53 54.4,53 53,3" />
      <rect x="64" y="90" width="12" height="10" />
      <path d="M64 90 Q70 82 76 90Z" />

      <!-- drawbridge (raised) -->
      <rect x="96" y="108" width="7" height="12" />
      <rect x="152" y="108" width="7" height="12" />
      <polygon points="103,111 107,111 126,84 122,82" />
      <polygon points="152,111 148,111 129,84 133,82" />
      <rect x="99" y="98" width="1.4" height="10" />
      <rect x="154.6" y="98" width="1.4" height="10" />
      <circle cx="99.7" cy="97" r="1.8" />
      <circle cx="155.3" cy="97" r="1.8" />

      <!-- St. Isaac's Cathedral -->
      <rect x="170" y="104" width="90" height="16" />
      <rect x="178" y="86" width="74" height="18" />
      <polygon points="193,86 237,86 215,77" />
      <rect x="180" y="76" width="8" height="10" />
      <path d="M180 76 Q184 70 188 76Z" />
      <rect x="242" y="76" width="8" height="10" />
      <path d="M242 76 Q246 70 250 76Z" />
      <rect x="197" y="63" width="36" height="17" />
      <rect x="194" y="60" width="42" height="4" />
      <path d="M197 60 C197 37 233 37 233 60Z" />
      <rect x="212" y="35" width="6" height="8" />
      <path d="M212 35 Q215 29 218 35Z" />
      <rect x="214.4" y="22" width="1.2" height="9" />
      <rect x="212.6" y="24.5" width="4.8" height="1.1" />

      <!-- Admiralty -->
      <rect x="280" y="104" width="80" height="16" />
      <rect x="312" y="82" width="16" height="22" />
      <rect x="315" y="70" width="10" height="12" />
      <path d="M315 70 Q320 63 325 70Z" />
      <polygon points="318.7,66 321.3,66 320,12" />

      <rect x="0" y="119" width="400" height="2" />
    </g>
    <g v-if="water" class="skyline__water" stroke="currentColor" stroke-linecap="round">
      <line x1="20" y1="126" x2="120" y2="126" />
      <line x1="150" y1="126" x2="290" y2="126" />
      <line x1="310" y1="126" x2="390" y2="126" />
      <line x1="50" y1="132" x2="170" y2="132" />
      <line x1="200" y1="132" x2="250" y2="132" />
      <line x1="280" y1="132" x2="360" y2="132" />
      <line x1="90" y1="138" x2="140" y2="138" />
      <line x1="190" y1="138" x2="320" y2="138" />
    </g>
  </svg>
</template>
