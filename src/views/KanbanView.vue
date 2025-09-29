<template>
  <main class="kanban-board">
    <KanbanColumn title="Para Fazer" :tasks="todoTasks" />
    <KanbanColumn title="Em Progresso" :tasks="inProgressTasks" />
    <KanbanColumn title="Concluído" :tasks="doneTasks" />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import KanbanColumn from '../components/KanbanColumn.vue'

const todoTasks = ref([
  { id: 1, title: 'Desenvolver a tela de login.', priority: { name: 'Alta Prioridade', color: '#E53935' } },
  { id: 2, title: 'Corrigir bug no formulário de contato.', priority: { name: 'Média Prioridade', color: '#FFB300' } },
]);

const inProgressTasks = ref([
  { id: 3, title: 'Implementar a funcionalidade de drag-and-drop.', priority: { name: 'Alta Prioridade', color: '#E53935' } },
]);

const doneTasks = ref([
  { id: 4, title: 'Configurar o ambiente de desenvolvimento.', priority: { name: 'Baixa Prioridade', color: '#42A5F5' } },
  { id: 5, title: 'Criar os componentes básicos da UI.', priority: { name: 'Média Prioridade', color: '#FFB300' } },
]);
</script>

<style scoped>
.kanban-board {
  display: flex;
  gap: 20px;
  padding: 20px;
  overflow-x: auto; 
  height: calc(100vh - 100px); 
}
</style>