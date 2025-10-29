<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  todo: { type: Number, default: 0 },
  inProgress: { type: Number, default: 0 },
  done: { type: Number, default: 0 },
});

const chartData = computed(() => ({
  labels: ['Para Fazer', 'Em Progresso', 'Concluído'],
  datasets: [
    {
      backgroundColor: ['#3498db', '#f1c40f', '#2ecc71'],
      data: [props.todo, props.inProgress, props.done],
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>