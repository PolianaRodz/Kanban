<template>
  <div class="team-view">
    <header class="view-header">
      <h1>Equipe do PROJETO 1</h1>
    </header>

    <div class="team-grid">
      <div v-for="member in teamWorkload" :key="member.id" class="member-card">
        <div class="member-info">
          <div class="member-avatar">{{ member.avatar }}</div>
          <span class="member-name">{{ member.name }}</span>
        </div>
        <div class="member-stats">
          <div class="stat-item">
            <span class="stat-value">{{ member.totalTasks }}</span>
            <span class="stat-label">Total de Tarefas</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ member.tasksInProgress }}</span>
            <span class="stat-label">Em Progresso</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useKanbanStore } from '../stores/kanbanStore';

const store = useKanbanStore();

const teamWorkload = computed(() => {
  return store.projectUsers.map(user => {
    let totalTasks = 0;
    let tasksInProgress = 0;

    store.columns.forEach(column => {
      column.tasks.forEach(task => {
        if (task.assignee === user.id) {
          totalTasks++;
          if (column.title === 'Em Progresso') {
            tasksInProgress++;
          }
        }
      });
    });

    return {
      ...user,
      totalTasks,
      tasksInProgress,
    };
  });
});
</script>

<style scoped>
  .team-view {
    padding: 2rem;
  }

  .view-header {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .member-card {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .member-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .member-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #2b6cb0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .member-name {
    font-size: 1.125rem;
    font-weight: 500;
  }

  .member-stats {
    display: flex;
    justify-content: space-around;
    background-color: #f7fafc;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #718096;
  }
</style>