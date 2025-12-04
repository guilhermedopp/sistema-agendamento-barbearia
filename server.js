const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// Importa conexão com o banco
const connection = require('./src/config/database');

const Profissional = require('./src/models/Profissional');

const profissionaisRoutes = require('./src/routes/profissionaisRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/profissionais', profissionaisRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);

    // O .sync() verifica se as tabelas existem e as cria se necessário
    connection.sync({ force: false }) 
        .then(() => console.log('Banco conectado e tabelas sincronizadas!'))
        .catch(err => console.error('Erro no banco:', err));
});