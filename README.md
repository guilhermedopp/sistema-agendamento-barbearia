# ✂️ Sistema de Agendamento - Barbearia/Salão

Sistema web desenvolvido para gerenciamento de agendamentos e serviços de uma barbearia/salão de beleza. O projeto utiliza o padrão de arquitetura **MVC (Model-View-Controller)** para garantir organização e escalabilidade.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework web rápido e minimalista.
* **Sequelize**: ORM (Object-Relational Mapper) para interação com o banco de dados.
* **SQLite**: Banco de dados relacional leve (arquivo local).
* **EJS**: Motor de visualização (Template Engine) para renderizar as páginas HTML.
* **Dotenv**: Gerenciamento de variáveis de ambiente.

## 📂 Estrutura do Projeto (MVC)

A estrutura de pastas foi organizada da seguinte forma:

```bash
src/
├── config/       # Configurações do banco de dados
├── controllers/  # Lógica de controle (Agendamento, Serviço)
├── models/       # Modelos do banco de dados (Sequelize)
├── routes/       # Definição das rotas da aplicação
├── views/        # Templates EJS (Interface do usuário)
└── app.js        # Arquivo principal da aplicação
## 📦 Como rodar o projeto

### Pré-requisitos
Certifique-se de ter o **Node.js** e o **Git** instalados em sua máquina.

### Passo a passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/guilhermedopp/sistema-agendamento-barbearia.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd sistema-agendamento-barbearia
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure o ambiente:**
    * Duplique o arquivo `.env.example` e renomeie para `.env`.
    * Configure as variáveis necessárias (se houver).

5.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```
    *O servidor iniciará (geralmente em http://localhost:3000) usando o Nodemon para reinicialização automática.*

## 🛠️ Funcionalidades Principais

* **Gerenciamento de Serviços:** Cadastro e listagem dos serviços oferecidos.
* **Agendamentos:** Criação e controle de horários marcados.
* **Banco de Dados:** Criação automática das tabelas via Sequelize (Sync).

*Projeto desenvolvido para a disciplina de Programação WEB.*
