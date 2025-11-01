<template>
  <div class="auth-card">
    <h2 class="title">Crie uma conta.</h2>
    <p class="login-link">Já tem uma conta? <a href="#"> Login</a></p>

    <form class="auth-form" @submit.prevent="handleRegister">
      <input
        v-model="name"
        id="name"
        type="text"
        placeholder="Digite seu nome..."
        required
      />

      <input
        v-model="email"
        id="email"
        type="email"
        placeholder="Digite seu email..."
        required
      />

      <input
        v-model="password"
        id="password"
        type="password"
        placeholder="Digite sua senha..."
        required
      />

      <button type="submit" class="register-btn">Registrar-se</button>
    </form>

    <div class="separator">Ou se registre com</div>

    <div class="social-login">
      <button class="social-btn github">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.61-4.042-1.61-.542-1.365-1.323-1.72-1.323-1.72-1.087-.744.084-.693.084-.693 1.205.086 1.838 1.233 1.838 1.233 1.07 1.836 2.809 1.305 3.495.998.108-.77.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.871.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.922.43.367.823 1.102.823 2.222 0 1.603-.015 2.896-.015 3.286 0 .318.193.694.801.576C20.562 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            fill="#000000"
          />
        </svg>
        GitHub
      </button>
      <button class="social-btn google-btn">
        <svg
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.697 12.3318C20.697 11.5364 20.6232 10.7636 20.4886 10H12.3182V14.4773H17.0236C16.8286 15.8273 16.2195 16.9682 15.2286 17.6591V20.4886H17.9195C19.6559 18.9136 20.697 15.9318 20.697 12.3318Z"
            fill="#4285F4"
          />
          <path
            d="M12.3182 22C15.1168 22 17.4855 21.0455 19.1441 19.5227L16.4532 17.6591C15.5891 18.25 14.0714 18.7273 12.3182 18.7273C9.70227 18.7273 7.47864 17.0318 6.64091 14.7045H3.84773V17.5909C5.46955 20.2727 8.65773 22 12.3182 22Z"
            fill="#34A853"
          />
          <path
            d="M6.64091 14.7045C6.38045 13.9091 6.22136 13.0682 6.22136 12.1818C6.22136 11.2955 6.38045 10.4545 6.64091 9.65909V6.77273H3.84773C3.23864 7.96818 2.92727 9.27273 2.92727 10.6364C2.92727 12.0000 3.23864 13.3045 3.84773 14.5000L6.64091 14.7045Z"
            fill="#FBBC05"
          />
          <path
            d="M12.3182 5.63636C13.8727 5.63636 15.2286 6.17273 16.3377 7.15909L19.2023 4.45C17.4855 2.875 15.1168 1.90909 12.3182 1.90909C8.65773 1.90909 5.46955 3.72727 3.84773 6.40909L6.64091 9.29545C7.47864 6.96818 9.70227 5.63636 12.3182 5.63636Z"
            fill="#EA4335"
          />
        </svg>
        Google
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");

function handleRegister() {
  console.log("Registrando usuário:", name.value, email.value);
  router.push({ name: "kanban" });
}
</script>

<style scoped>
.auth-card {
  width: 380px;
  min-height: 450px;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.15);
  background-color: transparent;
  padding: 40px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  z-index: 10;
  isolation: isolate;
}

.auth-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/imgs/background-texture-black.jpg");
  background-size: 105% 105%;
  background-position: center top;
  background-repeat: no-repeat;
  opacity: 0.1;
  z-index: -2;
}
.auth-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(139, 139, 139, 0.85) 100%
  );
  z-index: -1;
}

.title {
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 5px;
  color: #2d3748;
}
.login-link {
  font-size: 0.9rem;
  color: #717b84;
  margin-bottom: 30px;
}
.login-link a {
  text-decoration: none;
  font-weight: 900;
  color: #233951c4;
}
.auth-card h2,
.auth-card .login-link {
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form input {
  padding: 12px;
  border: 1px solid #5e547e6a;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: rgba(196, 196, 196, 0.215);
  transition: all 0.2s;
  color: #2d3748;
}

.auth-form input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: rgba(248, 249, 250, 0.481);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.register-btn {
  background-color: #19212e;
  color: rgba(255, 255, 255, 0.742);
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.register-btn:hover {
  background-color: #52555a;
}

.separator {
  text-align: center;
  font-size: 0.85rem;
  color: #292c2f;
  margin: 20px 0 15px 0;
  position: relative;
}
.separator::before,
.separator::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 27%;
  height: 0.2px;
  background-color: #00000052;
}
.separator::before {
  left: 0;
}
.separator::after {
  right: 0;
}

.social-login {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.social-btn {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  background-color: rgba(139, 157, 174, 0.116);
  border: 1px solid #161e2551;
  font-weight: 500;
  color: #2c3138;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
}
.social-btn:hover {
  background-color: #303d4a76;
}
.social-btn svg {
  fill: #2d3748;
  vertical-align: middle;
  margin-top: -2px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.9));
}
</style>
