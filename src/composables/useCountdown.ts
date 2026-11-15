import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export function useCountdown(targetISO: string) {
  const target = new Date(targetISO).getTime()
  const now = ref(Date.now())
  let timer: number | undefined

  onMounted(() => {
    timer = window.setInterval(() => (now.value = Date.now()), 1000)
  })
  onBeforeUnmount(() => window.clearInterval(timer))

  const diff = computed(() => Math.max(0, target - now.value))
  const isOver = computed(() => diff.value === 0)

  const parts = computed(() => {
    const total = Math.floor(diff.value / 1000)
    return {
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
    }
  })

  return { parts, isOver }
}

export function plural(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}
