<template>
  <div class="task-card">
    <div class="priority-tag" :style="{ backgroundColor: task.priority.color }">
      {{ task.priority.name }}
    </div>
    <p>{{ task.title }}</p>
    </div>
</template>

<script setup>
// Define que o componente espera receber uma 'prop' chamada 'task'
defineProps({
  task: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.task-card {
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  cursor: grab;
}
.priority-tag {
  font-size: 10px;
  font-weight: bold;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 8px;
}
p {
  margin: 0;
  font-size: 14px;
}
</style>