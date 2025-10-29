<!-- components/ConfirmModal.vue -->
<template>
  <div class="modal-overlay" @click.self="cancel">
    <div class="modal-content">
      <h2 class="modal-title">{{ title }}</h2>
      <p class="modal-message">{{ message }}</p>
      <div class="modal-actions">
        <button class="btn cancel" @click="cancel">Cancelar</button>
        <button class="btn confirm" @click="confirm">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  message: String,
});
const emit = defineEmits(['confirm', 'cancel']);

function confirm() {
  emit('confirm');
}
function cancel() {
  emit('cancel');
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
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 400px;
  width: 100%;
}
.modal-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.modal-message {
  margin-bottom: 1.5rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
.btn.cancel {
  background-color: #e2e8f0;
}
.btn.confirm {
  background-color: #e53e3e;
  color: white;
}
</style>
