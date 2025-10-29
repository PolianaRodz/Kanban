<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  sprintData: {
    type: Array,
    default: () => []
  }
});

const chartData = computed(() => ({
  labels: props.sprintData.map(s => s.sprint), // Ex: ['Sprint 1', 'Sprint 2']
  datasets: [
    {
      label: 'Esforço Concluído',
      backgroundColor: '#2ecc71',
      data: props.sprintData.map(s => s.completed), // Ex: [35, 42]
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>