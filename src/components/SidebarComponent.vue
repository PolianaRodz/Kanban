<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <nav class="main-nav">
        <RouterLink to="/" class="nav-link" title="Quadro Kanban">
          <LayoutGrid :size="35" />
        </RouterLink>
        <RouterLink to="/team" class="nav-link" title="Equipe">
          <UsersRound :size="35" />
        </RouterLink>
        <RouterLink to="/reports" class="nav-link" title="Relatórios">
          <BarChart3 :size="35" />
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
  width: 8rem;
  background-color: transparent;
  border-right: 0.0625rem solid #87919e;
  padding: 1rem 0;
  box-sizing: border-box;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}
.main-nav,
.bottom-nav {
  margin-top: 2rem;
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
  width: 7.8rem;
  height: 5rem;
  color: #756b86;
  transition: all 0.2s ease-in-out;
}

.nav-link:hover {
  background-color: #e2e8f0;
  color: #262038;
}

.nav-link.router-link-active {
  background: linear-gradient(
    to left,

    rgba(0, 0, 0, 0.15) 0%,
    rgba(236, 239, 241, 0) 70%
  );
}
</style>
