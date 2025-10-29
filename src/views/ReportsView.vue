<template>
  <div class="reports-view">
    <header class="view-header">
      <h1>Relatório do PROJETO 1</h1>
    </header>

    <div class="summary-cards">
      <div class="summary-card">
        <span class="value">{{ totalTasks }}</span>
        <span class="label">Total de Tarefas</span>
      </div>
      <div class="summary-card">
        <span class="value">{{ store.projectUsers.length }}</span>
        <span class="label">Membros do time</span>
      </div>
      <div class="summary-card">
        <span class="value">{{ completedTasks.length }}</span>
        <span class="label">Tarefas entregues</span>
      </div>
      <div class="summary-card">
        <span class="value">{{ productivityBySprint.length }}</span>
        <span class="label">Sprints concluídas</span>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-container large">
        <h3>PRODUTIVIDADE POR SPRINT</h3>
        <div class="chart-wrapper">
          <ProductivityChart :sprintData="productivityBySprint" />
        </div>
      </div>
      
      <div class="chart-container small">
        <h3>PROGRESSO SPRINTS</h3>
        <div class="chart-wrapper">
          <ProgressChart 
            :todo="tasksTodo.length" 
            :in-progress="tasksInProgress.length" 
            :done="completedTasks.length" 
          />
        </div>
      </div>

      <div class="chart-container medium">
        <h3>TEMPO MÉDIO (TAREFAS)</h3>
        <div class="avg-time-display">
          <span>Média Geral:</span>
          <strong>{{ averageCompletionTime }}</strong>
        </div>
        <ul class="task-time-list">
          <li v-for="task in completedTasks.slice(-5)" :key="task.id">
            <span>{{ task.title }}</span>
            <strong>{{ calculateTaskDuration(task) }}</strong>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useKanbanStore } from '../stores/kanbanStore';
import ProgressChart from '../components/charts/ProgressChart.vue';
import ProductivityChart from '../components/charts/ProductivityChart.vue';

const store = useKanbanStore();

// --- Métricas Básicas ---
const tasksTodo = computed(() => store.columns.find(c => c.title === 'Para Fazer')?.tasks || []);
const tasksInProgress = computed(() => store.columns.find(c => c.title === 'Em Progresso')?.tasks || []);
const completedTasks = computed(() => store.columns.find(c => c.title === 'Concluído')?.tasks || []);
const totalTasks = computed(() => store.columns.flatMap(c => c.tasks).length);


// --- Lógica para TEMPO MÉDIO ---
const averageCompletionTime = computed(() => {
  const tasksWithTime = completedTasks.value.filter(t => t.createdAt && t.completedAt);
  if (tasksWithTime.length === 0) return 'N/A';

  const totalMilliseconds = tasksWithTime.reduce((sum, task) => {
    const start = new Date(task.createdAt).getTime();
    const end = new Date(task.completedAt).getTime();
    return sum + (end - start);
  }, 0);

  const avgMilliseconds = totalMilliseconds / tasksWithTime.length;
  const avgDays = avgMilliseconds / (1000 * 60 * 60 * 24);
  return `${avgDays.toFixed(1)} dias`;
});

function calculateTaskDuration(task) {
  if (!task.createdAt || !task.completedAt) return 'N/A';
  const start = new Date(task.createdAt).getTime();
  const end = new Date(task.completedAt).getTime();
  const days = (end - start) / (1000 * 60 * 60 * 24);
  return `${days.toFixed(1)} dias`;
}

// --- Lógica para PRODUTIVIDADE POR SPRINT ---
const productivityBySprint = computed(() => {
  const allTasks = store.columns.flatMap(c => c.tasks);
  const sprints = {};

  allTasks.forEach(task => {
    if (!task.sprint || !task.effort) return;

    if (!sprints[task.sprint]) {
      sprints[task.sprint] = { completedEffort: 0 };
    }
    
    if (completedTasks.value.some(doneTask => doneTask.id === task.id)) {
      sprints[task.sprint].completedEffort += task.effort;
    }
  });

  return Object.keys(sprints).map(sprintNum => ({
    sprint: `Sprint ${sprintNum}`,
    completed: sprints[sprintNum].completedEffort,
  }));
});
</script>

<style scoped>
  .reports-view {
    padding: 2rem;
    color: #2d3748;
  }

  .view-header {
    margin-bottom: 2rem;
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .summary-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .summary-card .value {
    font-size: 2rem;
    font-weight: 700;
  }

  .summary-card .label {
    font-size: 0.875rem;
    color: #718096;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-auto-rows: minmax(300px, auto);
    gap: 1.5rem;
  }

  .chart-container {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
  }

  .chart-container.large { 
    grid-column: 1 / 2; 
    grid-row: 1 / 3; 
  }

  .chart-container.small { 
    grid-column: 2 / 3; 
    grid-row: 1 / 2; 
  }

  .chart-container.medium { 
    grid-column: 2 / 3; 
    grid-row: 2 / 3; 
  }

  .chart-wrapper {
    position: relative;
    flex-grow: 1; 
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
  }

  .avg-time-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #f7fafc;
    border-radius: 0.5rem;
  }

  .avg-time-display span {
    font-size: 0.875rem;
    color: #718096;
  }

  .avg-time-display strong {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
  }

  .task-time-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    flex-grow: 1;
  }

  .task-time-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.25rem;
    background-color: #f7fafc;
    font-size: 0.875rem;
  }

  .task-time-list span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 1rem;
  }
</style>