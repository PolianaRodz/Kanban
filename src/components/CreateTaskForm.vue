<template>
  <form class="create-task-form" @submit.prevent="submitTask">
    <textarea
      v-model="taskTitle"
      class="task-title-input"
      placeholder="Em que você está trabalhando?"
      rows="3"
      ref="titleInput"
    ></textarea>
    
    <div class="form-row">
      <label for="priority-select">Prioridade:</label>
      <select id="priority-select" v-model="selectedPriorityName" class="priority-select">
        <option 
          v-for="p in store.priorities" 
          :key="p.name" 
          :value="p.name"
        >
          {{ p.name }}
        </option>
      </select>
    </div>
    <div class="form-actions">
      <button type="submit" class="save-btn">Salvar</button>
      <button type="button" class="cancel-btn" @click="$emit('cancel')">Cancelar</button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useKanbanStore } from '../stores/kanbanStore'; 

const emit = defineEmits(['createTask', 'cancel']);

const store = useKanbanStore();
const taskTitle = ref('');
const selectedPriorityName = ref(store.priorities[2]?.name || 'Baixa Prioridade'); 

const titleInput = ref(null);
onMounted(() => {
  titleInput.value?.focus();
});

function submitTask() {
  if (!taskTitle.value.trim()) return;

  emit('createTask', { 
    title: taskTitle.value.trim(),
    priority: selectedPriorityName.value 
  });

  
  taskTitle.value = '';
}
</script>

<style scoped>
.create-task-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.task-title-input {
  width: 100%;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  resize: none;
  box-sizing: border-box; 
}
.task-title-input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 1px #4299e1;
}


.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.form-row label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #4a5568;
}
.priority-select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #cbd5e0;
  background-color: #f8fafc;
}


.form-actions {
  display: flex;
  gap: 0.5rem;
}
.save-btn, .cancel-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
}
.save-btn {
  background-color: #2b6cb0;
  color: white;
}
.cancel-btn {
  background-color: #e2e8f0;
  color: #4a5568;
}
</style>