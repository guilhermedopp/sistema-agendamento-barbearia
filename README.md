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
    * **Usuário Comum**: Pode agendar horários.
    * **Administrador**: Tem acesso a um painel exclusivo para cadastrar novos usuários/admins e gerenciar o sistema.
* **Validações**: Tratamento de erros no Backend (ex: não permitir agendamento no passado ou duplicidade de horário).
* **Filtros**: Busca avançada de agendamentos por Data e Status.

## 📂 Estrutura do Projeto (MVC)

```bash
src/
├── config/       # Configuração do Banco de Dados
├── controllers/  # Regras de Negócio (Auth, Agendamento, Profissional)
├── middlewares/  # Proteção de Rotas (Auth.js, AdminAuth.js)
├── models/       # Tabelas do Banco (Usuario, Agendamento, Serviço)
├── routes/       # Rotas (URLs) da aplicação
├── views/        # Telas (EJS)
└── app.js        # Entrada da aplicação
```

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

    * O servidor iniciará (geralmente em http://localhost:3000) usando o Nodemon para reinicialização automática. *



6. **Primeiro acesso (Criando Admin)**

   * Acesse a rota /registrar no navegador
   * Crie sua conta
   * (Opcional) Edite o banco de dados ou o código para tornar este usuário isAdmin: true.
    

## 🛠️ Funcionalidades Principais
1.  **Agendamento e Serviços**
* **Agendamento Inteligente**: O sistema impede agendamentos em horários passados ou que gerem conflito com outros clientes.
* **Cálculo Automático**: O horário de término é calculado automaticamente com base na duração do serviço.

2.  **Painel Administrativo & Segurança**
* **Login e Cadastro: Sistema completo de autenticação com senhas criptografadas.**
* **Níveis de Acesso (ACL)**:
  * **Admin**: Pode cadastrar novos usuários e gerenciar o sistema.
  * **Usuário Comum**: Acesso restrito às funcionalidades operacionais.
  * **Proteção de Rotas**: Middlewares que bloqueiam acesso não autorizado via URL.

3. **Gestão e Visualização**
* **Filtros Avançados**: Busca de agendamentos por Data específica ou Status (Agendado, Realizado, Cancelado).
* **Status Visual**: Cores diferentes para facilitar a identificação visual do status do atendimento.

Projeto desenvolvido para a disciplina de Programação WEB.
