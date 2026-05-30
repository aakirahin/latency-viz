<script setup lang="ts">
import { useWebSocket } from '@/composables/useWebSocekt';
import { useLatencyStore } from '@/store/latency';
import { ref } from 'vue';

const store = useLatencyStore()
const { connect, disconnect } = useWebSocket()

const url = ref('ws://localhost:8080')

const handleToggle = () => {
    if (store.status === 'connected') disconnect()
    else connect(url.value)
}
</script>

<template>
<div class="flex items-center gap-2 w-full">
    <input
        v-model="url"
        :disabled="store.status !== 'disconnected'"
        placeholder="ws://localhost:8080"
        class="flex flex-1 px-3 py-2 border border-[#444] rounded-xl bg-[#1A1A1A] text-white text-sm disabled:opacity-50"
    />
    <button
        @click="handleToggle"
        :disabled="store.status === 'connecting'"
        :class="[
            'btn text-white px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed', 
            store.status === 'connected' ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
        ]"
    >
        {{ store.status === 'connected' ? 'Disconnect' : 'Connect' }}
    </button>
    <span :class="['status-dot', store.status]" :title="store.status"/>
</div>
</template>

<style scoped>
.btn {
    font-weight: 600;
}

.status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
}

.status-dot.disconnected { background: #555; }
.status-dot.connecting   { background: #facc15; animation: pulse 1s infinite; }
.status-dot.connected    { background: #22c55e; animation: pulse 2s infinite; }

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}
</style>