<template>
  <div class="login-page-container">
    <LoginComponent />

    <div class="auth-card-wrapper">
      <AuthCardComponent />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import LoginComponent from "../components/LoginComponent.vue";
import AuthCardComponent from "../components/AuthCardComponent.vue";

const router = useRouter();

function simulateLogin() {
  router.push({ name: "kanban" });
}
</script>

<style scoped>
.login-page-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
}

.auth-card-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(55px, -50%);
  z-index: 20;
}
</style>
