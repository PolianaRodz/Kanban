<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>Criar Nova Coluna</h3>
      <form @submit.prevent="save">
        <div class="form-group">
          <label for="column-title">Nome da Coluna</label>
          <input
            id="column-title"
            v-model="columnTitle"
            type="text"
            required
            placeholder="Ex: Em Revisão"
            ref="titleInput"
          />
        </div>
        <div class="modal-actions">
          <button type="button" class="cancel-btn" @click="$emit('close')">Cancelar</button>
          <button type="submit" class="save-btn">Criar Coluna</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['close', 'save']);
const columnTitle = ref('');
const titleInput = ref(null); 

onMounted(() => {
  titleInput.value?.focus();
});

function save() {
  if (columnTitle.value.trim()) {
    emit('save', columnTitle.value.trim());
  }
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
    z-index: 1000;
  }

  .modal-content {
    background-color: white; 
    padding: 2rem; 
    border-radius: 0.5rem;
    width: 90%; 
    max-width: 400px; 
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 600;
    color: #1a202c;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
    color: #4a5568;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.25rem;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 1px #4299e1;
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
    font-weight: 500;
  }

  .save-btn {
    background-color: #2b6cb0;
    color: white;
  }

  .save-btn:hover {
    background-color: #2c5282;
  }

  .cancel-btn {
    background-color: #e2e8f0;
    color: #4a5568;
  }

  .cancel-btn:hover {
    background-color: #cbd5e0;
  }
</style>