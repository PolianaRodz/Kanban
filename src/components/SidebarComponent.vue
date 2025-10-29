<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <nav class="main-nav">
        <RouterLink to="/" class="nav-link" title="Quadro Kanban">
          <LayoutGrid :size="24" />
        </RouterLink>
        <RouterLink to="/team" class="nav-link" title="Equipe">
          <UsersRound :size="24" />
        </RouterLink>
        <RouterLink to="/reports" class="nav-link" title="Relatórios">
          <BarChart3 :size="24" />
        </RouterLink>
      </nav>

      <div class="bottom-nav">
        <RouterLink to="/settings" class="nav-link" title="Configurações">
          <Settings :size="24" />
        </RouterLink>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { LayoutGrid, UsersRound, BarChart3, Settings } from "lucide-vue-next";
</script>

<style scoped>
.sidebar {
  width: 5rem;
  background-color: #f4f7fa;
  border-right: 0.0625rem solid #e2e8f0;
  height: 100vh;
  padding: 1rem 0;
  box-sizing: border-box;

  .sidebar-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    align-items: center;

    .main-nav,
    .bottom-nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 100%;
    }

    .nav-link {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 0.5rem;
      color: #718096;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #e2e8f0;
        color: #1a202c;
      }

      &.router-link-active {
        background-color: #d6eaf8;
        color: #2b6cb0;
      }
    }
  }
}
</style>
