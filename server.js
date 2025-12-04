const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// Importa conexão com o banco e testa
const connection = require('./src/config/database');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);

    // Teste de conexão com o banco
    connection.authenticate()
        .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
        .catch(err => console.error('Erro ao conectar com o banco:', err));
});