import { onBeforeUnmount, ref } from 'vue'
import { useSettings } from './useSettings'

const LEAVE_MS = 800

/**
 * Drives an intro screen through numbered stages.
 * `play([0, 700, 1900])` sets stage 1 now, stage 2 at 700ms, stage 3 at 1900ms,
 * then fades the intro out and emits `open`. With animations off it opens immediately.
 */
export function useIntro(emitOpen: () => void) {
  const { animations } = useSettings()
  const stage = ref(0)
  const leaving = ref(false)
  const timers: number[] = []

  function play(stageStarts: number[], hold = 900) {
    if (stage.value > 0 || timers.length) return
    if (!animations.value) {
      emitOpen()
      return
    }
    stageStarts.forEach((t, i) => timers.push(window.setTimeout(() => (stage.value = i + 1), t)))
    const end = stageStarts[stageStarts.length - 1] + hold
    timers.push(window.setTimeout(() => (leaving.value = true), end))
    timers.push(window.setTimeout(emitOpen, end + LEAVE_MS))
  }

  onBeforeUnmount(() => timers.forEach(clearTimeout))

  return { stage, leaving, play, animations }
}
