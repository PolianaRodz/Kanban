import { defineStore } from "pinia";

const LOCAL_STORAGE_KEY = "kanbanState";

function getRandomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function getRandomGradient() {
  const color1 = getRandomHexColor();
  const color2 = getRandomHexColor();
  const angle = Math.floor(Math.random() * 360);
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}


const allPriorities = [
  { name: "Alta Prioridade", gradient: "linear-gradient(to right, #ffc1c1ff, #ff0000ff)" },
  { name: "Média Prioridade", gradient: "linear-gradient(to right, #eeeda6ff, #ffc400ff)" },
  { name: "Baixa Prioridade", gradient: "linear-gradient(to right, #9cb9e5ff, #0540beff)" }
];


export const useKanbanStore = defineStore("kanban", {
  state: () => ({
    projectUsers: [],
    columns: [],
    priorities: [], 
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
        { id: "user1", name: "Alice", avatar: "A" },
        { id: "user2", name: "Bruno", avatar: "B" },
        { id: "user3", name: "Carla", avatar: "C" },
      ];
      this.priorities = allPriorities;
      this.columns = [
        {
          id: 1,
          title: "Para Fazer",
          gradientStyle: getRandomGradient(),
          tasks: [
            {
              id: 101,
              title: "Desenvolver a tela de login",
              description: "...",
              priority: this.priorities[0], 
              comments: [],
              attachments: 1,
              assignee: "user1",
              checklist: [],
              createdAt: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000
              ).toISOString(),
              completedAt: null,
              sprint: 1,
              effort: 5,
            },
            {
              id: 102,
              title: "Corrigir bug no formulário",
              description: "...",
              priority: this.priorities[1], 
              comments: [],
              attachments: 2,
              assignee: null,
              checklist: [],
              createdAt: new Date(
                Date.now() - 1 * 24 * 60 * 60 * 1000
              ).toISOString(),
              completedAt: null,
              sprint: 1,
              effort: 3,
            },
            {
              id: 103,
              title: "Atualizar ícone do footer",
              description: "...",
              priority: this.priorities[2],
              comments: [],
              attachments: 0,
              assignee: null,
              checklist: [],
              createdAt: new Date().toISOString(),
              completedAt: null,
              sprint: 1,
              effort: 1,
            }
          ],
        },
        {
          id: 2,
          title: "Em Progresso",
          gradientStyle: getRandomGradient(),
          tasks: [],
        },
        {
          id: 3,
          title: "Concluído",
          gradientStyle: getRandomGradient(),
          tasks: [],
        },
      ];
      this.saveState();
    },

    addColumn(title) {
      if (!title || !title.trim()) return;
      const newColumn = {
        id: Date.now(),
        title: title.trim(),
        tasks: [],
        gradientStyle: getRandomGradient(),
      };
      this.columns.push(newColumn);
      this.saveState();
    },

    renameColumn({ columnId, newTitle }) {
      if (!newTitle || !newTitle.trim()) return;
      const column = this.columns.find((c) => c.id === columnId);
      if (column) {
        column.title = newTitle.trim();
        this.saveState();
      }
    },

    deleteColumn(columnId) {
      this.columns = this.columns.filter((c) => c.id !== columnId);
      this.saveState();
    },

    addNewTask({ task, columnTitle }) {
      const targetColumn = this.columns.find((c) => c.title === columnTitle);
      if (targetColumn) {
        
        const newTask = {
          id: Date.now(), 
          title: task.title, 
          description: "", 
          createdAt: new Date().toISOString(),
          completedAt: null,
          sprint: 1, 
          effort: 3, 
          comments: [], 
          checklist: [], 
          attachments: 0, 
          assignee: null, 
          priority: null 
        };

        if (task.priority && typeof task.priority === 'string') {
          const priorityName = task.priority;
          const foundPriority = this.priorities.find(p => p.name === priorityName);
          newTask.priority = foundPriority ? foundPriority : this.priorities[2]; 
        } else if (!task.priority) {
          newTask.priority = this.priorities[2]; 
        }
        targetColumn.tasks.push(newTask);
        this.saveState();
      }
    },
   
    handleMoveTask({ taskId, targetColumnTitle }) {
      let taskToMove;
      let sourceColumn;
      for (const column of this.columns) {
        const taskIndex = column.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          sourceColumn = column;
          taskToMove = column.tasks[taskIndex];
          break;
        }
      }
      if (taskToMove) {
        if (targetColumnTitle === "Concluído" && !taskToMove.completedAt) {
          taskToMove.completedAt = new Date().toISOString();
        }
        if (
          sourceColumn.title === "Concluído" &&
          targetColumnTitle !== "Concluído"
        ) {
          taskToMove.completedAt = null;
        }
        sourceColumn.tasks = sourceColumn.tasks.filter((t) => t.id !== taskId);
        const targetColumn = this.columns.find(
          (c) => c.title === targetColumnTitle
        );
        if (targetColumn) {
          targetColumn.tasks.push(taskToMove);
        }
        this.saveState();
      }
    },

    assignTask({ userId, taskId, columnId }) {
      const column = this.columns.find((c) => c.id === columnId);
      if (column) {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task) {
          task.assignee = userId;
          this.saveState();
        }
      }
    },

    updateTask({ taskId, updatedTask }) {
      for (const column of this.columns) {
        const taskIndex = column.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          column.tasks[taskIndex] = {
            ...column.tasks[taskIndex],
            ...updatedTask,
          };
          this.saveState();
          break;
        }
      }
    },
  },
});