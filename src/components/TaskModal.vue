<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>Adicionar Nova Tarefa</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="task-title">Título da Tarefa</label>
          <input
            id="task-title"
            v-model="newTask.title"
            type="text"
            required
            placeholder="Ex: Corrigir bug na home"
          />
        </div>

        <div class="form-group">
          <label for="task-priority">Prioridade</label>
          <select id="task-priority" v-model="newTask.priority.name">
            <option>Baixa Prioridade</option>
            <option>Média Prioridade</option>
            <option>Alta Prioridade</option>
          </select>
        </div>

        <div class="modal-actions">
          <button type="button" @click="$emit('close')">Cancelar</button>
          <button type="submit">Salvar Tarefa</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const emit = defineEmits(["close", "save"]);
const newTask = ref({
  title: "",
  priority: { name: "Baixa Prioridade", color: "#1976D2" },
});

const priorityColorMap = {
  "Baixa Prioridade": "#1976D2",
  "Média Prioridade": "#FBC02D",
  "Alta Prioridade": "#D32F2F",
};

function handleSubmit() {
  newTask.value.priority.color = priorityColorMap[newTask.value.priority.name];
  
  emit("save", {
    ...newTask.value,
    id: Date.now(),
    comments: 0,
    attachments: 0,
    assignee: null,
  });
}
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 30rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
  }
  
  button[type="submit"] {
    background-color: #2b6cb0;
    color: white;
  }
</style>
