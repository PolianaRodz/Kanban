<template>
  <div class="app-container">
    
    <transition name="fade">
      <NavbarComponent v-if="isRouterReady && $route.name !== 'auth'" />
    </transition>

    <div class="main-content-wrapper">
      
      <SidebarComponent :class="{ 'sidebar-hidden': !isRouterReady || $route.name === 'auth' }" />
      
      <main>
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRouter } from "vue-router"; 
import { ref, onMounted } from 'vue'; 
import NavbarComponent from "./components/NavbarComponent.vue";
import SidebarComponent from "./components/SidebarComponent.vue";

const isRouterReady = ref(false);
const router = useRouter();

onMounted(() => {
  router.isReady().then(() => {
    isRouterReady.value = true;
  });
});
</script>

<style> 
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; font: inherit; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

html {
  height: 100%;
  overflow: hidden; 
}

body {
  background: linear-gradient(to bottom, #ccd3d5, #ede8e8, #dfdfdf);
  isolation: isolate;
  position: relative; 
  height: 100%; 
}

body::before {
  content: ""; 
  position: absolute; 
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url("../src/assets/imgs/background-img.jpg");
  background-position: center; 
  background-size: cover; 
  background-repeat: no-repeat;
  opacity: 0.2; 
  z-index: -1;
}

.sidebar {
  width: 8rem; 
  opacity: 1;
  transition: width 0.3s ease, opacity 0.3s ease;
  overflow: hidden; 
}
.sidebar.sidebar-hidden {
  width: 0; 
  opacity: 0;
  padding: 1rem 0; 
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%; 
  overflow: hidden;
  background-color: transparent; 
}

.main-content-wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  background-color: transparent; 
}

main {
  flex-grow: 1;
  overflow-y: auto;
  background-color: transparent; 
}
</style>
