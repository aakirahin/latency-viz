<script setup lang="ts">
import { useLatencyStore } from '@/store/latency';
import { computed } from 'vue';

const store = useLatencyStore()

const latencyClass = computed(() => {
    const ms = store?.latest ?? 0
    if (ms < 50) return 'good'
    if (ms < 150) return 'warn'
    return 'bad'
})
const statClass = "flex flex-col items-center bg-[#1A1A1A] border border-[#333] rounded-xl md:p-5 p-3 w-full"
const labelClass = "label text-xs text-[#888] uppercase tracking-wider"
const valueClass = `value md:text-lg text-[#ccc] `
</script>

<template>
<div class=" grid grid-cols-3 md:flex gap-4 md:gap-4 w-full">
    <div :class="statClass">
        <span :class="labelClass">Latest</span>
        <span :class="valueClass + latencyClass">{{ store.latest }} ms</span>
    </div>
    <div :class="statClass">
        <span :class="labelClass">Average</span>
        <span :class="valueClass">{{ store.avg }} ms</span>
    </div>
    <div :class="statClass">
        <span :class="labelClass">Minimum</span>
        <span :class="valueClass" class="good">{{ store.min }} ms</span>
    </div>
    <div :class="statClass">
        <span :class="labelClass">Maximum</span>
        <span :class="valueClass" class="bad">{{ store.max }} ms</span>
    </div>
    <div :class="statClass">
        <span :class="labelClass">Samples</span>
        <span :class="valueClass">{{ store.readings.length }}</span>
    </div>
</div>
</template>

<style scoped>
.label {
    margin-bottom: 0.25rem;
}

.value {
    font-weight: 600;
}

.good { 
    color: #22c55e; 
}

.warn { 
    color: #facc15; 
}

.bad  { 
    color: #ef4444; 
}
</style>