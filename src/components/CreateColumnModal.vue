<template>
  <div class="modal-overlay" @click.self="cancel">
    <div class="modal-content">
      <h2 class="modal-title">Criar Nova Coluna</h2>
      <input
        v-model="columnTitle"
        placeholder="Digite o nome da coluna"
        class="modal-input"
        @keyup.enter="confirm"
      />
      <div class="modal-actions">
        <button class="btn cancel" @click="cancel">Cancelar</button>
        <button class="btn confirm" @click="confirm" :disabled="!columnTitle.trim()">Criar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const columnTitle = ref('');
const emit = defineEmits(['confirm', 'cancel']);

function confirm() {
  if (columnTitle.value.trim()) {
    emit('confirm', columnTitle.value.trim());
    columnTitle.value = '';
  }
}

function cancel() {
  emit('cancel');
  columnTitle.value = '';
}
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

  .modal-content {
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 90%;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2d3748;
  }

  .modal-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    box-sizing: border-box;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .btn.cancel {
    background-color: #e2e8f0;
    color: #2d3748;
  }

  .btn.cancel:hover {
    background-color: #cbd5e0;
  }

  .btn.confirm {
    background-color: #2b6cb0;
    color: white;
  }

  .btn.confirm:hover {
    background-color: #2c5282;
  }

  .btn.confirm:disabled {
    background-color: #90cdf4;
    cursor: not-allowed;
  }
</style>
