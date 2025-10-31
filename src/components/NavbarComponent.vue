<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="../assets/icons/logo-eficaz.svg" alt="Logo eficaz tecnologia" />
    </div>

    <div class="navbar-right">
      <button class="icon-button">
        <BellIcon :size="22" color="#8A94A6" />
      </button>
      <div class="user-profile">
        <div class="avatar">PR</div>
        <span>Otavio A.</span>
        <ChevronDownIcon :size="20" color="#8A94A6" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import {
  StarIcon,
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
} from "lucide-vue-next";
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #2d3748, #1a202c);
  color: #e2e8f0;
  padding: 0.75rem 1.5rem;
  height: 4rem;
  box-sizing: border-box;
  position: relative;
  isolation: isolate;
}

.navbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/imgs/navbar-background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.15;
  z-index: -1;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  color: #63b3ed;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.user-profile .avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: #63b3ed;
  color: #1a202c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
}
</style>
