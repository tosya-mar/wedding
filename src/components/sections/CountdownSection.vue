<script setup lang="ts">
import { computed } from 'vue'
import { plural, useCountdown } from '../../composables/useCountdown'
import { wedding } from '../../data/wedding'

const { parts, isOver } = useCountdown(wedding.dateISO)

const units = computed(() => [
  { key: 'd', value: parts.value.days, label: plural(parts.value.days, ['день', 'дня', 'дней']) },
  { key: 'h', value: parts.value.hours, label: plural(parts.value.hours, ['час', 'часа', 'часов']) },
  { key: 'm', value: parts.value.minutes, label: plural(parts.value.minutes, ['минута', 'минуты', 'минут']) },
  { key: 's', value: parts.value.seconds, label: plural(parts.value.seconds, ['секунда', 'секунды', 'секунд']) },
])

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="countdown">
    <h2 v-reveal class="countdown__title">
      {{ isOver ? 'Мы поженились!' : 'До нашей свадьбы осталось' }}
    </h2>
    <div v-if="!isOver" v-reveal="'zoom'" class="countdown__grid" role="timer" aria-live="off">
      <div v-for="u in units" :key="u.key" class="countdown__unit">
        <span class="countdown__value">
          <Transition name="tick" mode="out-in">
            <span :key="u.value">{{ u.key === 'd' ? u.value : pad(u.value) }}</span>
          </Transition>
        </span>
        <span class="countdown__label">{{ u.label }}</span>
      </div>
    </div>
    <p v-else class="countdown__done">Спасибо, что были с нами в этот день</p>
  </div>
</template>
