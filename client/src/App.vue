<script setup lang="ts">
import ConnectionPanel from './components/ConnectionPanel.vue';
import LatencyChart from './components/LatencyChart.vue';
import StatsBar from './components/StatsBar.vue';

</script>

<template>
<div class="div flex justify-center items-center h-screen">
  <div class="flex flex-col items-center gap-4 md:w-[600px] w-[400px]">
    <h1 class="title text-2xl text-white tracking-wide w-full">Internet Latency Visualiser</h1>
    <ConnectionPanel />
    <StatsBar />
    <LatencyChart />
  </div>
</div>
</template>

<style scoped>
.div {
  margin: 2rem
}

.title {
  font-weight: 600;
}
</style>
