import { defineStore } from 'pinia'

const LOCAL_STORAGE_KEY = 'kanbanState';

export const useKanbanStore = defineStore('kanban', {
  state: () => ({
    projectUsers: [],
    columns: [],
    isStateInitialized: false,
  }),

  actions: {
    saveState() {
      const stateToSave = {
        columns: this.columns,
        projectUsers: this.projectUsers,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    },

    initializeStore() {
      if (this.isStateInitialized) return;
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        this.columns = parsedState.columns;
        this.projectUsers = parsedState.projectUsers;
      } else {
        this.fetchDefaultBoard();
      }
      this.isStateInitialized = true;
    },

    fetchDefaultBoard() {
      this.projectUsers = [
        { id: 'user1', name: 'Alice', avatar: 'A' },
        { id: 'user2', name: 'Bruno', avatar: 'B' },
        { id: 'user3', name: 'Carla', avatar: 'C' },
      ];
      this.columns = [
        { 
          id: 1, 
          title: 'Para Fazer', 
          tasks: [
            { 
              id: 101, title: 'Desenvolver a tela de login', description: '...',
              priority: { name: 'Alta Prioridade', color: '#D32F2F' },
              comments: [], attachments: 1, assignee: 'user1', checklist: [],
              createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              completedAt: null,
              sprint: 1,
              effort: 5,
            },
             { 
              id: 102, title: 'Corrigir bug no formulário', description: '...',
              priority: { name: 'Média Prioridade', color: '#FBC02D' },
              comments: [], attachments: 2, assignee: null, checklist: [],
              createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              completedAt: null,
              sprint: 1,
              effort: 3,
            },
          ] 
        },
        { id: 2, title: 'Em Progresso', tasks: [] },
        { id: 3, title: 'Concluído', tasks: [] }
      ];
      this.saveState();
    },

    addColumn(title) {
      if (!title || !title.trim()) return;
      const newColumn = {
        id: Date.now(), 
        title: title.trim(),
        tasks: [], 
      };
      this.columns.push(newColumn); 
      this.saveState();
    },

    renameColumn({ columnId, newTitle }) {
      if (!newTitle || !newTitle.trim()) return;
      const column = this.columns.find(c => c.id === columnId);
      if (column) {
        column.title = newTitle.trim();
        this.saveState();
      }
    },

    deleteColumn(columnId) {
      this.columns = this.columns.filter(c => c.id !== columnId);
      this.saveState();
    },
    
    addNewTask({ task, columnTitle }) {
      const targetColumn = this.columns.find(c => c.title === columnTitle);
      if (targetColumn) {
        task.createdAt = new Date().toISOString();
        task.completedAt = null;
        task.sprint = 1;
        task.effort = 3;
        task.comments = [];
        task.checklist = [];
        targetColumn.tasks.push(task);
        this.saveState();
      }
    },

    handleMoveTask({ taskId, targetColumnTitle }) {
      let taskToMove;
      let sourceColumn;
      for (const column of this.columns) {
        const taskIndex = column.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          sourceColumn = column;
          taskToMove = column.tasks[taskIndex];
          break;
        }
      }
      if (taskToMove) {
        if (targetColumnTitle === 'Concluído' && !taskToMove.completedAt) {
          taskToMove.completedAt = new Date().toISOString();
        }
        if (sourceColumn.title === 'Concluído' && targetColumnTitle !== 'Concluído') {
          taskToMove.completedAt = null;
        }
        sourceColumn.tasks = sourceColumn.tasks.filter(t => t.id !== taskId);
        const targetColumn = this.columns.find(c => c.title === targetColumnTitle);
        if (targetColumn) {
          targetColumn.tasks.push(taskToMove);
        }
        this.saveState();
      }
    },

    assignTask({ userId, taskId, columnId }) {
      const column = this.columns.find(c => c.id === columnId);
      if (column) {
        const task = column.tasks.find(t => t.id === taskId);
        if (task) {
          task.assignee = userId;
          this.saveState();
        }
      }
    },

    updateTask({ taskId, updatedTask }) {
      for (const column of this.columns) {
        const taskIndex = column.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          column.tasks[taskIndex] = { ...column.tasks[taskIndex], ...updatedTask };
          this.saveState();
          break;
        }
      }
    },
  },
})