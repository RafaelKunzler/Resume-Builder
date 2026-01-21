# Resume Builder

Um gerador de currículo moderno desenvolvido com **Next.js**, que permite ao usuário preencher múltiplos formulários e visualizar o currículo em tempo real, com possibilidade de exportação em PDF.

Este projeto foi criado com o objetivo de praticar conceitos modernos de React, organização de estado e boas práticas de arquitetura front-end, simulando padrões utilizados em aplicações reais.

---

## ✨ Funcionalidades

- Formulário de currículo dividido em múltiplas seções
- Navegação entre seções sem perda de dados
- Estado do formulário centralizado e compartilhado entre componentes
- Visualização do currículo em tempo real
- Validação de dados com schemas
- Interface responsiva e acessível
- Estrutura preparada para exportação em PDF

---

## 🛠️ Tecnologias Utilizadas

- **Next.js (App Router)** – Framework React
- **React** – Biblioteca para construção de interfaces
- **Tailwind CSS** – Estilização utilitária
- **React Hook Form** – Gerenciamento de formulários
- **Zod** – Validação baseada em schemas-
- **shadcn/ui** – Componentes acessíveis e reutilizáveis

---

## 🧠 Visão Geral da Arquitetura

- Uso do **FormProvider** do React Hook Form para compartilhar o estado entre múltiplos formulários
- Um componente de preview consome os dados do formulário em tempo real
- Arquitetura pensada para fácil manutenção e escalabilidade
- Preview do currículo utilizando useWatch, refletindo mudanças em tempo real

