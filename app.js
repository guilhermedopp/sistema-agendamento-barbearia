const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// Conecta com o banco
const connection = require('./src/config/database');

// Models
const Profissional = require('./src/models/Profissional');
const Servico = require('./src/models/Servico');
const Agendamento = require('./src/models/Agendamento');
const Usuario = require('./src/models/Usuario');

// Rotas
const profissionaisRoutes = require('./src/routes/profissionaisRoutes');
const servicosRoutes = require('./src/routes/ServicosRoutes');
const agendamentosRoutes = require('./src/routes/agendamentoRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Configurações da View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src', '/views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rotas
app.use('/', authRoutes);
app.use('/profissionais', profissionaisRoutes);
app.use('/servicos', servicosRoutes);
app.use('/agendamentos', agendamentosRoutes);

// Rota Principal
app.get('/', (req, res) => {
    res.render('index');
});

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);

    connection.sync({ force: false }) 
        .then(() => console.log('Banco conectado e tabelas sincronizadas!'))
        .catch(err => console.error('Erro no banco:', err));
});