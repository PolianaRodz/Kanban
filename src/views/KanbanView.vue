<template>
  <div class="kanban-view">
    <header class="view-header">
      <h1>PROJETO 1</h1>
    </header>

    <div class="columns-container">
      <KanbanColumnComponent
        v-for="column in store.columns"
        :key="column.id"
        :columnId="column.id"
        :title="column.title"
        :tasks="column.tasks"
        :projectUsers="store.projectUsers"
        :gradientStyle="column.gradientStyle"
        @addNewTask="store.addNewTask"
        @moveTask="store.handleMoveTask"
        @openTaskDetail="openDetailModal"
        @openAssigneePopup="openAssigneePopup"
        @deleteColumn="handleDeleteColumn"
      />
    </div>

    <TaskDetailModal
      v-if="selectedTask"
      :task="selectedTask"
      :projectUsers="store.projectUsers"
      :priorities="store.priorities"
      @close="closeDetailModal"
      @updateTask="handleUpdateTask"
    />
    <div
      v-if="assigneePopup.isOpen"
      class="assignee-popup"
      :style="{
        top: `${assigneePopup.top}px`,
        left: `${assigneePopup.left}px`,
      }"
      v-on-click-outside="() => (assigneePopup.isOpen = false)"
    >
      <div
        v-for="user in store.projectUsers"
        :key="user.id"
        class="user-item"
        @click="assignTask(user.id)"
      >
        {{ user.name }}
      </div>
    </div>

    <AddColumnModal
      v-if="isAddColumnModalOpen"
      @close="isAddColumnModalOpen = false"
      @save="createNewColumn"
    />

    <button class="add-column-fab" @click="isAddColumnModalOpen = true">
      +
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useKanbanStore } from "../stores/kanbanStore";
import KanbanColumnComponent from "../components/KanbanColumnComponent.vue";
import TaskDetailModal from "../components/TaskDetailModal.vue";
import AddColumnModal from "../components/AddColumnModal.vue";
import { vOnClickOutside } from "@vueuse/components";

const store = useKanbanStore();

onMounted(() => {
  store.initializeStore();
});

const selectedTask = ref(null);
const assigneePopup = ref({
  isOpen: false,
  taskId: null,
  columnId: null,
  top: 0,
  left: 0,
});

function openDetailModal(task) {
  selectedTask.value = task;
}

function closeDetailModal() {
  selectedTask.value = null;
}

function handleUpdateTask(updatedTask) {
  store.updateTask({ taskId: updatedTask.id, updatedTask: updatedTask });
}

function openAssigneePopup(event, task, column) {
  const buttonRect = event.currentTarget.getBoundingClientRect();
  assigneePopup.value = {
    isOpen: true,
    taskId: task.id,
    columnId: column.id,
    top: buttonRect.bottom + 8,
    left: buttonRect.left,
  };
}

function assignTask(userId) {
  store.assignTask({
    userId: userId,
    taskId: assigneePopup.value.taskId,
    columnId: assigneePopup.value.columnId,
  });
  assigneePopup.value.isOpen = false;
}

function handleDeleteColumn(columnId) {
  store.deleteColumn(columnId);
}

function deleteColumn(columnId) {
  columns.value = columns.value.filter((col) => col.id !== columnId);
}

const isAddColumnModalOpen = ref(false);

function createNewColumn(newTitle) {
  store.addColumn(newTitle);
  isAddColumnModalOpen.value = false;
}
</script>

<style scoped>
.kanban-view {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.view-header {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
}

.columns-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-grow: 1;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.assignee-popup {
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  padding: 0.5rem;
}

.user-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
}

.user-item:hover {
  background-color: #f0f0f0;
}

.add-column-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #1e1a3d;
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease-in-out;
  z-index: 50;
  display: flex;
  padding-top: 2.5px;
  justify-content: center;
}

.add-column-fab:hover {
  background-color: #2c5282;
}
</style>
