<template>
  <div class="modal-overlay" @click.self="saveAndClose">
    <div class="modal-content" v-if="editableTask.id">
      <button class="close-btn" @click="saveAndClose"><X :size="24" /></button>
      
      <div class="modal-layout">
        <div class="main-content">
          <input type="text" class="task-main-title" v-model="editableTask.title" />
          
          <h3 class="section-title">Descrição</h3>
          <textarea class="description-box" placeholder="Escreva uma descrição..." v-model="editableTask.description"></textarea>
          
          <h3 class="section-title">CHECKLIST</h3>
          <div class="checklist">
            <div v-for="item in editableTask.checklist" :key="item.id" class="check-item">
              <input type="checkbox" v-model="item.completed" />
              <input type="text" v-model="item.text" class="check-item-input" />
            </div>
          </div>
          <div class="add-checklist-item">
            <input type="text" v-model="newChecklistItemText" placeholder="Adicionar um item..." @keyup.enter="addChecklistItem" />
            <button @click="addChecklistItem">Adicionar</button>
          </div>
        </div>
        
        <div class="sidebar-content">
          <div class="metadata-group">
            <label>Responsável</label>
            <select v-model="editableTask.assignee" class="value-select">
              <option :value="null">Ninguém</option>
              <option v-for="user in projectUsers" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>

          <div class="metadata-group">
            <label>Prioridade</label>
            <select @change="onPriorityChange" class="value-select">
              <option
                v-for="p in props.priorities"
                :key="p.name"
                :value="p.name"
                :selected="p.name === editableTask.priority.name"
              >
                {{ p.name }}
              </option>
            </select>
            <div 
              v-if="editableTask.priority"
              class="value-item priority-tag" 
              :style="{ background: editableTask.priority.gradient, marginTop: '8px' }"
            >
              {{ editableTask.priority.name }}
            </div>
          </div>
          <div class="metadata-group">
            <label>Prazo</label>
            <input type="date" v-model="editableTask.deadline" class="value-input" />
          </div>
          <hr />
          <h3 class="section-title">Comentários</h3>
          </div>
      </div>
      
      <div class="modal-footer">
        <button class="save-btn" @click="saveAndClose">Salvar e Fechar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { X } from 'lucide-vue-next';

const props = defineProps({
  task: { type: Object, required: true },
  projectUsers: { type: Array, default: () => [] },
  priorities: { type: Array, default: () => [] } 
});

const emit = defineEmits(['close', 'updateTask']);
const editableTask = ref({ checklist: [], comments: [] });
const newChecklistItemText = ref('');
const newCommentText = ref('');

watchEffect(() => {
  editableTask.value = JSON.parse(JSON.stringify(props.task));
});
function onPriorityChange(event) {
  const priorityName = event.target.value;
  const newPriorityObject = props.priorities.find(p => p.name === priorityName);
  if (newPriorityObject) {
    editableTask.value.priority = newPriorityObject;
  }
}


function addChecklistItem() {
  if (!newChecklistItemText.value.trim()) return;
  if (!editableTask.value.checklist) editableTask.value.checklist = [];
  editableTask.value.checklist.push({ id: `chk${Date.now()}`, text: newChecklistItemText.value, completed: false });
  newChecklistItemText.value = '';
}

function addComment() {
  if (!newCommentText.value.trim()) return;
  if (!editableTask.value.comments) editableTask.value.comments = [];
  editableTask.value.comments.push({ id: `com${Date.now()}`, author: 'Poliana R.', text: newCommentText.value });
  newCommentText.value = '';
}

function saveAndClose() {
  emit('updateTask', editableTask.value);
  emit('close');
}
</script>

<style scoped>
.value-item.priority-tag { 
  color: white; 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.20); 
  position: relative; 
  z-index: 1; 
}

.modal-overlay {
    position: fixed; 
    top: 0; left: 0; 
    width: 100%; 
    height: 100%;
    background-color: rgba(0,0,0,0.6); 
    display: flex; align-items: center; 
    justify-content: center;
    z-index: 1000;
  }
  .modal-content {
      background-color: #f4f7fa; 
      color: #2d3748; 
      width: 90%; 
      max-width: 1000px; 
      height: 80%;
      border-radius: 0.75rem; 
      padding: 2rem; 
      position: relative; 
      display: flex; 
      flex-direction: column;
  }
  .close-btn {
      position: absolute; 
      top: 1rem; 
      right: 1rem; 
      background: none; 
      border: none; 
      cursor: pointer;
  }
  .modal-layout {
      display: flex; 
      gap: 2rem; 
      flex-grow: 1; 
      overflow-y: auto;
  }
  .main-content {
      flex: 2;
  }
  .sidebar-content {
      flex: 1;
  }
  .task-main-title {
      font-size: 2rem; 
      font-weight: 700; 
      margin-bottom: 1rem;
      border: 1px solid transparent; 
      background: none; 
      width: 100%;
      border-radius: 0.25rem; 
      padding: 0.25rem;
      transition: all 0.2s ease-in-out;
  }
  .task-main-title:hover { 
      border-color: #e2e8f0; 
  }
  .task-main-title:focus { 
      outline: none; 
      border-color: #4299e1; 
      background-color: white; 
  }
  .section-title {
      font-size: 1rem; 
      font-weight: 600; 
      margin-bottom: 1rem;
      text-transform: uppercase; 
      color: #4a5568;
  }
  textarea {
      width: 100%; 
      padding: 1rem; 
      border-radius: 0.5rem;
      border: 1px solid #cbd5e0; 
      resize: vertical; 
      box-sizing: border-box;
  }
  .description-box {
      min-height: 100px;
  }
  .checklist {
      display: flex; 
      flex-direction: column; 
      gap: 0.5rem;
  }
  .check-item {
      display: flex; 
      align-items: center; 
      gap: 0.5rem;
  }
  .check-item-input {
      border: 1px solid transparent; 
      background: none; 
      width: 100%;
      border-radius: 0.25rem; 
      padding: 0.25rem;
      transition: all 0.2s ease-in-out;
  }
  .check-item-input:hover { 
      border-color: #e2e8f0; 
  }
  .check-item-input:focus { 
      outline: none; 
      border-color: #4299e1; 
      background-color: white; 
  }
  .metadata-group {
      margin-bottom: 1.5rem;
  }
  .metadata-group label {
      display: block; font-size: 0.875rem; 
      font-weight: 500;
      color: #718096; 
      margin-bottom: 0.25rem;
  }
  .value-item {
      background-color: #e2e8f0; 
      padding: 0.5rem;
      border-radius: 0.25rem; 
      display: inline-block;
  }
  hr {
      border: none; 
      border-top: 1px solid #cbd5e0; 
      margin: 1.5rem 0;
  }
  .modal-footer {
      display: flex; 
      justify-content: flex-end; 
      gap: 1rem;
      padding-top: 1rem;
      margin-top: auto;
      border-top: 1px solid #e2e8f0;
  }
  .save-btn, .cancel-btn {
      padding: 0.75rem 1.5rem; 
      border-radius: 0.5rem;
      border: none; cursor: pointer; 
      font-weight: 500; 
      font-size: 0.875rem;
  }
  .save-btn { 
      background-color: #2b6cb0; 
      color: white; 
  }
  .cancel-btn { 
      background-color: #e2e8f0; 
      color: #4a5568; 
  }
  .add-checklist-item {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  .add-checklist-item input {
    flex-grow: 1;
    border: 1px solid #cbd5e0;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }
  .add-checklist-item button {
    background-color: #e2e8f0;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 500;
    color: #4a5568;
  }
  .comments-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 150px;
    overflow-y: auto;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: #e2e8f0;
  }
  .comment {
    background-color: white;
    padding: 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid #e2e8f0;
    font-size: 0.875rem;
    word-wrap: break-word;
  }
  .comment p {
    margin: 0.25rem 0 0;
  }
  .add-comment {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .add-comment button {
    align-self: flex-start;
    background-color: #2b6cb0;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  .value-select, .value-input {
    width: 100%;
    background-color: #e2e8f0;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #e2e8f0;
  }
</style>