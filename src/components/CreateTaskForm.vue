<template>
  <form @submit.prevent="handleSubmit" class="create-form">
    <div class="form-group">
      <textarea
        v-model="newTask.title"
        placeholder="Digite um título para este card..."
        rows="2"
        required
        class="form-textarea"
      ></textarea>
    </div>

    <div class="form-group">
      <textarea
        v-model="newTask.description"
        placeholder="Adicione uma descrição (opcional)..."
        rows="4"
        class="form-textarea"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="task-priority">Prioridade</label>
      <select id="task-priority" v-model="newTask.priority.name" class="form-select">
        <option>Baixa Prioridade</option>
        <option>Média Prioridade</option>
        <option>Alta Prioridade</option>
      </select>
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-btn">Adicionar Card</button>
      <button type="button" class="cancel-btn" @click="$emit('cancel')">
        <X :size="18" />
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { X } from 'lucide-vue-next';

const emit = defineEmits(['createTask', 'cancel']);

const priorityColorMap = {
  'Baixa Prioridade': '#1976D2',
  'Média Prioridade': '#FBC02D',
  'Alta Prioridade': '#D32F2F',
};

const newTask = ref({
  title: '',
  description: '',
  priority: { name: 'Baixa Prioridade' }
});

function handleSubmit() {
  if (!newTask.value.title.trim()) return;

  const taskToCreate = {
    id: Date.now(),
    title: newTask.value.title,
    description: newTask.value.description,
    priority: {
      name: newTask.value.priority.name,
      color: priorityColorMap[newTask.value.priority.name]
    },
    comments: 0,
    attachments: 0,
    assignee: null,
  };

  emit('createTask', taskToCreate);
  
  newTask.value.title = '';
  newTask.value.description = '';
  newTask.value.priority.name = 'Baixa Prioridade';
}
</script>

<style scoped>
  .create-form {
    background-color: white;
    border-radius: 0.5rem;
    padding: 0.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .form-group {
    margin-bottom: 0.75rem;
  }

  .form-textarea, .form-select {
    width: 100%;
    border: 1px solid #cbd5e0;
    resize: vertical;
    box-sizing: border-box;
    padding: 0.5rem;
    border-radius: 0.25rem;
    outline: none;
  }

  .form-textarea:focus, .form-select:focus {
    border-color: #4299e1;
  }

  label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #718096;
    margin-bottom: 0.25rem;
    display: block;
  }

  .form-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  button {
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .submit-btn {
    padding: 0.5rem 1rem;
    background-color: #2b6cb0;
    color: white;
  }

  .cancel-btn {
    background: none;
    color: #718096;
    padding: 0.5rem;
  }
</style>