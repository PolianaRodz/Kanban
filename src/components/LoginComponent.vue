<template>
  <div class="marketing-block-center">
    <div class="text-block">
      <h1 class="main-title">
        Sua Lista de Tarefas
        <span class="title-line-2">Mais Inteligente.</span>
      </h1>
      <h2 class="sub-title">A IA que Define o Próximo Passo.</h2>
      <p class="description-text">
        Nosso quadro Kanban é projetado para evitar gargalos e o acúmulo de
        trabalho. Monitore cada etapa da entrega em tempo real, limite o
        trabalho em progresso e priorize a conclusão, não o início.
      </p>
      <p class="description-text-ai">
        Automatizamos a parte mais difícil: a priorização. Nossa IA monitora o
        fluxo do seu time, identifica gargalos e sugere automaticamente a ordem
        de execução, assegurando que o trabalho em andamento se mova rápido e
        constante, do 'A Fazer' ao 'Concluído'.
      </p>
    </div>
    <img
      src="../assets/imgs/logo-login.png"
      alt="Logo do Sistema"
      class="marketing-logo-image"
    />
  </div>
</template>

<script setup></script>

<style scoped>
.marketing-block-center {
  background: linear-gradient(145deg, #eae9e9, #afaaaa);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 950px;
  height: 650px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  z-index: 10;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 40px;
}

.marketing-block-center::before,
.marketing-block-center::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  opacity: 0.7;
  filter: blur(40px);
  z-index: 1;
}

.marketing-block-center::after {
  bottom: 5px;
  right: 495px;
  width: 420px;
  height: 390px;
  background: radial-gradient(circle, #07548c, #8371bf);
}

.marketing-block-center::before {
  bottom: 240px;
  right: 370px;
  width: 420px;
  height: 390px;
  z-index: 2;
  background: radial-gradient(circle, #21424e, #21424e);
}

.marketing-logo-image {
  position: absolute;
  bottom: 40px;
  left: 40px;
  width: 80px;
  height: auto;
  z-index: 5;
}

.text-block {
  z-index: 5;
  position: relative;
  padding-top: 45px;
  padding-left: 40px;
}

.main-title {
  font-size: 1.9rem;
  font-weight: 650;
  color: #132c3c;
  margin: 0;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}

.title-line-2 {
  font-size: 2.5rem;
  font-weight: 700;
  display: block;
  font-weight: 900;
}

.sub-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffffa9;
  padding-top: 48px;
  right: -135px;
  display: inline-block;
  margin-top: 0.1rem;
  position: relative;
  z-index: 5;
  padding-bottom: 5px;
  right: -115px;
}

.sub-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -30px;
  width: calc(100% + 30px);
  height: 0.2px;
  background-color: #dbdbdb52;
}

.description-text {
  font-size: 0.7rem;
  font-weight: 550;
  margin-top: 0.4rem;
  color: #ffffffb0;
  position: relative;
  z-index: 5;
  display: block;
  line-height: 1.5;
  border-radius: 8px;
  max-width: 45%;
  text-align: right;
  right: -25px;
}

.description-text-ai {
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffffad;
  line-height: 1.3;
  border-radius: 8px;
  padding: 12px;
  position: relative;
  z-index: 5;
  margin-top: 3.5rem;
  text-align: left;
  left: -10px;
  max-width: 40%;
}
</style>
