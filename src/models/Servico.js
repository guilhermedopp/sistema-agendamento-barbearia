const { DataTypes } = require('sequelize');
const connection = require('../config/database');

const Servico = connection.define('Servico', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duracaoMin: {
        type: DataTypes.INTEGER, // Ex: 30, 45, 60
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2), // Ex: 35.00
        allowNull: false
    }
});

module.exports = Servico;