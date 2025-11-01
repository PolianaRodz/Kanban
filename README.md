# Kanban - Front Fabrica De Projetos 

---

Este projeto é uma aplicação de quadro Kanban interativa, desenvolvida com Vue 3 e Vite. Ele permite aos usuários gerenciar tarefas visualmente através de colunas, com funcionalidade de drag-and-drop, criação, edição e exclusão de tarefas.

A aplicação inclui gerenciamento de estado centralizado com Pinia, garantindo que os dados sejam consistentes em toda a interface, e utiliza o localStorage para persistir o estado do quadro, salvando o trabalho do usuário entre as sessões.

---

## Features

**Quadro Kanban:** Visualize colunas (Ex: "Para Fazer", "Em Progresso", "Concluído").

**Drag & Drop:** Mova tarefas facilmente entre as colunas.

**Gerenciamento de Tarefas:** Crie, edite e exclua tarefas através de um modal detalhado.

**Persistência de Dados:** Seu quadro é salvo automaticamente no localStorage do navegador.

**Navegação por Rotas:** O projeto usa o Vue Router para navegar entre diferentes seções:

- /(Quadro Kanban Principal)

- /reports (Página de Relatórios)

- /team (Página de Equipe)

**Design Responsivo:** A interface é limpa e funcional em diferentes tamanhos de tela.

---

## Stack Tecnológica
**Vue 3** (usando Composition API e <script setup>)

**Vite** (para um ambiente de desenvolvimento rápido)

**Pinia** (para gerenciamento de estado global)

**Vue Router** (para roteamento no lado do cliente)

---

