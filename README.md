# ✂️ Sistema de Agendamento - Barbearia/Salão

Sistema web desenvolvido para gerenciamento de agendamentos e serviços de uma barbearia/salão de beleza. O projeto utiliza o padrão de arquitetura **MVC (Model-View-Controller)** para garantir organização, escalabilidade e segurança.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias e bibliotecas:

* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework web para gerenciamento de rotas e middleware.
* **Sequelize**: ORM para interação com o banco de dados SQLite.
* **EJS**: Template Engine para renderização do Frontend.
* **Autenticação & Segurança**:
    * **Bcrypt.js**: Criptografia (hash) de senhas.
    * **JWT (JSON Web Token)**: Gerenciamento de sessões seguras.
    * **Cookie-Parser**: Armazenamento seguro do token no navegador.
    * **Express-Validator**: Sanitização e validação de dados de entrada.

## 🔒 Funcionalidades e Segurança

O sistema conta com regras de negócio e proteção de dados:

* **Autenticação**: Sistema de Login e Cadastro (com senhas criptografadas).
* **Controle de Acesso (ACL)**:
    * **Usuário Comum**: Pode agendar horários e visualizar apenas o próprio histórico.
    * **Administrador**: Tem acesso a um painel exclusivo para gerenciar profissionais, serviços e usuários.
* **Validações**: Tratamento de erros no Backend (ex: não permitir agendamento no passado ou duplicidade de horário).
* **Filtros**: Busca avançada de agendamentos por Data e Status.

## 📂 Estrutura do Projeto (MVC)

A estrutura de pastas foi organizada da seguinte forma:

```bash
src/
├── config/       # Configuração do Banco de Dados
├── controllers/  # Regras de Negócio (Auth, Agendamento, Profissional, Serviço)
├── middlewares/  # Proteção de Rotas (Auth.js, AdminAuth.js)
├── models/       # Tabelas do Banco (Usuario, Agendamento, Serviço, Profissional)
├── routes/       # Rotas (URLs) da aplicação
├── services/     # Lógica de serviços auxiliares
├── views/        # Telas (EJS)
│   ├── agendamentos/
│   ├── auth/
│   ├── profissionais/
│   ├── servicos/
│   └── index.ejs
└── app.js        # Entrada da aplicação
````

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

      * Crie um arquivo `.env` na raiz do projeto (baseado no `.env.example`).
      * Defina a chave de segurança JWT:

    <!-- end list -->

    ```ini
    JWT_SECRET=SuaSenhaSecretaAqui
    ```

5.  **Inicie o servidor:**

    ```bash
    npm run dev
    ```

    *O servidor iniciará (geralmente em http://localhost:3000).*

6.  **Primeiro acesso (Criando Admin):**

      * Acesse a rota `/registrar` no navegador.
      * Crie sua conta.
      * **Importante:** Por padrão, novos usuários são clientes. Para tornar este usuário **Admin**, edite a coluna `isAdmin` para `1` (true) diretamente no banco de dados SQLite ou utilize um script temporário.

## 🛠️ Funcionalidades Principais

### 1\. Agendamento e Serviços

  * **Agendamento Inteligente**: O sistema impede agendamentos em horários passados ou que gerem conflito com outros clientes.
  * **Cálculo Automático**: O horário de término é calculado automaticamente com base na duração do serviço escolhido.

### 2\. Painel Administrativo & Segurança

  * **Gestão Completa**: CRUD (Criar, Ler, Atualizar, Deletar) de Profissionais e Serviços.
  * **Níveis de Acesso (ACL)**:
      * **Admin**: Pode cadastrar novos usuários e gerenciar o sistema.
      * **Usuário Comum**: Acesso restrito às funcionalidades operacionais (Portal do Cliente).
  * **Proteção de Rotas**: Middlewares que bloqueiam acesso não autorizado via URL.

### 3\. Gestão e Visualização

  * **Filtros Avançados**: Busca de agendamentos por Data específica ou Status (Agendado, Realizado, Cancelado).
  * **Status Visual**: Cores diferentes para facilitar a identificação visual do status do atendimento.

-----

*Projeto desenvolvido para a disciplina de Programação WEB.*
