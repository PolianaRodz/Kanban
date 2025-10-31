<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="../assets/icons/logo-eficaz.svg" alt="Logo eficaz tecnologia" />
    </div>

    <div class="navbar-right">
      <button class="icon-button">
        <BellIcon :size="22" color="#8A94A6" />
      </button>

      <div class="divider"></div>
      <div class="user-profile">
        <img src="@/assets/imgs/taskbar-user.jpg" alt="Avatar" class="avatar" />

        <span>Usuario</span>
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
  color: #b6b8bb;
  padding: 0.75rem 1.5rem;
  height: 4rem;
  box-sizing: border-box;
  position: relative;
  isolation: isolate;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

.navbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("@/assets/imgs/navbar-background.jpg");
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
  gap: 1.7rem;
}

.divider {
  width: 1.5px;
  height: 4rem;
  background-color: rgba(255, 255, 255, 0.2);
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
  object-fit: cover;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
}
</style>
