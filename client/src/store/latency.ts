import { defineStore } from "pinia";
import { computed, ref } from "vue";

// Global, shared state
export const useLatencyStore = defineStore('latency', () => {
    // State
    // "ref" creates a reactive variable; when it changes, anything in the UI using it will re-render
    const readings = ref<number[]>([])
    const status = ref<'disconnected' | 'connecting' | 'connected'>('disconnected')

    // Getters
    // Recalculated automatically whenever state changes
    const min = computed(() => !readings.value.length ? 0 : Math.min(...readings.value))
    const max = computed(() => !readings.value.length ? 0 : Math.max(...readings.value))
    const latest = computed(() => !readings.value.length ? 0 : readings.value[readings.value.length - 1])
    const avg = computed(() => {
        if (!readings.value.length) return 0
        const sum = readings.value.reduce((a, c) => a + c)
        return Math.round(sum / readings.value.length)
    })

    // Actions
    // Functions that mutate state
    const addReading = (ms: number) => {
        readings.value.push(ms)
        if (readings.value.length > 60) readings.value.shift() // Drop oldest, keep a 60-point window
    }

    const reset = () => {
        readings.value = []
        status.value = 'disconnected'
    }

    return { readings, status, min, max, latest, avg, addReading, reset }
})