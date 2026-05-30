<script lang="ts">
// Runs once at module load
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip)

// Defined outside setup so the object reference never changes between renders
export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
        x: {
            ticks: { color: '#666' },
            grid:  { color: '#222' },
        },
        y: {
            beginAtZero: true,
            ticks: { color: '#666', callback: (v: unknown) => `${v}ms` },
            grid:  { color: '#222' },
        },
    },
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: (ctx: { raw: unknown }) => ` ${ctx.raw}ms`,
            },
        },
    },
} as const
</script>

<script setup lang="ts">
// Runs per component instance
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { useLatencyStore } from '@/store/latency'

const store = useLatencyStore()

// Re-runs whenever "store.readings" changes
const chartData = computed(() => ({
    labels: store.readings.map((_, i) => i + 1),
    datasets: [
        {
            label: 'RTT (ms)',
            // Shallow copy gives a stable snapshot
            // Since Pinia mutates the same array, the reference never changes
            // Confuses Chart.js's internal diffing
            data: [...store.readings],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderWidth: 2,
            pointRadius: 2,
            tension: 0.3,
            fill: true,
        },
    ],
}))
</script>

<template>
<div class="relative w-full h-[300px] bg-[#111] border border-[#333] rounded-xl p-10">
    <p 
        v-if="!store.readings.length" 
        class="absolute inset-0 flex items-center justify-center text-[#555]"
    >
        Connect to start collecting data…
    </p>
    <Line v-else :data="chartData" :options="chartOptions" />
</div>
</template>

<style scoped>
</style>