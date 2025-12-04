const Sequelize = require('sequelize');

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Cria o banco na raiz
    logging: false
});

module.exports = connection;