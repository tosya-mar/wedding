<script setup lang="ts">
const year = 2027
const month = 7 // August, 0-based
const weddingDay = 15

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const daysInMonth = new Date(year, month + 1, 0).getDate()
const offset = (new Date(year, month, 1).getDay() + 6) % 7

const cells: (number | null)[] = [
  ...Array.from({ length: offset }, () => null),
  ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
]
</script>

<template>
  <div class="calendar" v-reveal>
    <div class="calendar__head">
      <span class="calendar__month">Август</span>
      <span class="calendar__year">{{ year }}</span>
    </div>
    <div class="calendar__grid">
      <span v-for="w in weekdays" :key="w" class="calendar__wd">{{ w }}</span>
      <span
        v-for="(d, i) in cells"
        :key="i"
        class="calendar__day"
        :class="{ 'is-wedding': d === weddingDay, 'is-empty': d === null }"
      >
        <template v-if="d === weddingDay">
          <svg class="calendar__heart" viewBox="0 0 40 36" aria-hidden="true">
            <path d="M20 33 C6 23 2 16 2 10.5 C2 5 6 2 10.5 2 C14.5 2 18 4.5 20 8 C22 4.5 25.5 2 29.5 2 C34 2 38 5 38 10.5 C38 16 34 23 20 33Z" />
          </svg>
          <span>{{ d }}</span>
        </template>
        <template v-else>{{ d ?? '' }}</template>
      </span>
    </div>
  </div>
</template>
