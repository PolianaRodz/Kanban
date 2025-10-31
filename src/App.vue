<template>
  <div class="app-container">
    <SidebarComponent />

    <div class="main-content">
      <NavbarComponent />
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavbarComponent from "./components/NavbarComponent.vue";
import SidebarComponent from "./components/SidebarComponent.vue";
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  font: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

main {
  flex-grow: 1;
  background: linear-gradient(to bottom, #ccd3d5, #ede8e8, #dfdfdf);
  overflow-y: auto;
}
</style>
