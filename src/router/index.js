import { createRouter, createWebHistory } from 'vue-router'
import KanbanView from '../views/KanbanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'kanban',
      component: KanbanView
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/ReportsView.vue')
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/TeamView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
  ]
})

export default router