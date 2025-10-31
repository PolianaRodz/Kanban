<template>
  <div class="app-container">
    <NavbarComponent />

    <div class="main-content-wrapper">
      <SidebarComponent />
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
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-content-wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  background: linear-gradient(to bottom, #ccd3d5, #ede8e8, #dfdfdf);
  position: relative;
  isolation: isolate;
}

.main-content-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../src/assets/imgs/background-img.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.2;
  z-index: -1;
}

main {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
