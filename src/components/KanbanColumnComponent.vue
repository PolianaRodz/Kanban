<template>
  <div class="kanban-column" @dragover.prevent @drop="onDrop">
    <div
      class="column-color-bar"
      :style="{ background: props.gradientStyle }"
    ></div>

    <div class="column-header">
      <input
        v-if="isRenaming"
        v-model="editableTitle"
        class="column-title-input"
        @blur="finishRename"
        @keyup.enter="finishRename"
        ref="titleInput"
      />
      <h3 v-else class="column-title" @dblclick="startRename">
        {{ title }}
      </h3>
      <button class="options-btn" @click="handleDelete">
        <Trash2 :size="16" />
      </button>
    </div>

    <div class="cards-container">
      <TaskCardComponent
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :projectUsers="projectUsers"
        @openTaskDetail="(task) => $emit('openTaskDetail', task)"
        @openAssigneePopup="(event) => $emit('openAssigneePopup', event, task)"
      />
    </div>

    <CreateTaskForm
      v-if="isCreatingTask"
      @createTask="handleCreateTask"
      @cancel="isCreatingTask = false"
    />

    <button v-else class="add-card-btn" @click="isCreatingTask = true">
      <Plus :size="16" /> Add Card
    </button>

    <ConfirmModal
      v-if="showDeleteModal"
      title="Excluir Coluna"
      message="Tem certeza que deseja excluir esta coluna? Todas as tarefas nela serão perdidas."
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { Trash2, Plus } from "lucide-vue-next";
import TaskCardComponent from "./TaskcardComponent.vue";
import CreateTaskForm from "./CreateTaskForm.vue";
import ConfirmModal from "./ConfirmModal.vue";

const props = defineProps({
  columnId: {
    type: [String, Number],
    required: true,
  },
  title: String,
  tasks: Array,
  projectUsers: {
    type: Array,
    default: () => [],
  },

  gradientStyle: {
    type: String,
    default: "linear-gradient(to right, #6b7280, #4a5568)",
  },
  // -----------------------
});

const emit = defineEmits([
  "addNewTask",
  "moveTask",
  "openTaskDetail",
  "openAssigneePopup",
  "renameColumn",
  "deleteColumn",
]);

const isCreatingTask = ref(false);
function handleCreateTask(newTask) {
  emit("addNewTask", { task: newTask, columnTitle: props.title });
  isCreatingTask.value = false;
}

function onDrop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("taskId");
  if (taskId) {
    emit("moveTask", {
      taskId: parseInt(taskId),
      targetColumnTitle: props.title,
    });
  }
}

const isRenaming = ref(false);
const editableTitle = ref(props.title);
const titleInput = ref(null);

function startRename() {
  isRenaming.value = true;
  nextTick(() => {
    titleInput.value?.focus();
  });
}

function finishRename() {
  if (isRenaming.value) {
    emit("renameColumn", {
      columnId: props.columnId,
      newTitle: editableTitle.value,
    });
    isRenaming.value = false;
  }
}

const showDeleteModal = ref(false);
function handleDelete() {
  showDeleteModal.value = true;
}
function confirmDelete() {
  emit("deleteColumn", props.columnId);
  showDeleteModal.value = false;
}
function cancelDelete() {
  showDeleteModal.value = false;
}
</script>

<style scoped>
.kanban-column {
  background-color: #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
  min-width: 20rem;
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.column-color-bar {
  height: 10px;
  margin-top: -1rem;
  margin-left: -1rem;
  margin-right: -1rem;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-title {
  font-weight: 600;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  overflow-y: auto;
  min-height: 50px;
}

.options-btn,
.add-card-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #718096;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.add-card-btn {
  justify-content: center;
}

.options-btn:hover,
.add-card-btn:hover {
  background-color: #cbd5e0;
}
</style>
