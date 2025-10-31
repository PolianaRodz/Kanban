<template>
  <div
    class="task-card"
    draggable="true"
    @dragstart="onDragStart"
    @click="$emit('openTaskDetail', task)"
  >
    <div class="card-header">
      <span
        v-if="task.priority" class="priority-tag"
        :style="{ 
          background: task.priority.gradient 
        }"
      >
        {{ task.priority.name }}
      </span>
    </div>

    <p class="task-title">{{ task.title }}</p>

    <div class="card-footer">
      <div class="stats">
        <span><MessageSquareText :size="14" /> {{ task.comments.length || 0 }}</span>
        <span><Paperclip :size="14" /> {{ task.attachments || 0 }}</span>
      </div>
      <div class="actions">
        <button class="action-btn"><Plus :size="16" /></button>
        <button class="assignee" @click.stop="$emit('openAssigneePopup', $event)">
          {{ task.assignee ? projectUsers.find(u => u.id === task.assignee)?.avatar : '' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MessageSquareText, Paperclip, Plus } from "lucide-vue-next";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  projectUsers: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['openTaskDetail', 'openAssigneePopup']);

function onDragStart(event) {
  event.dataTransfer.setData('taskId', props.task.id.toString());
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
}
</script>

<style scoped>
  .task-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border: 1px solid #e2e8f0;
    transition: box-shadow 0.2s ease-in-out;
  }
  .task-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .priority-tag {
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    display: inline-block;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.30); 
    position: relative; 
    z-index: 1; 
  }

  
  .task-title {
    font-size: 0.875rem;
    color: #2d3748;
    margin: 0;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #718096;
  }
  .stats,
  .actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .stats span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
  }
  .action-btn {
    background: none;
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #718096;
  }

  .assignee {
    width: 1.5rem;
    height: 1.5rem;
    background-color: #cbd5e0;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.75rem;
    color: #2d3748;
  }
</style>