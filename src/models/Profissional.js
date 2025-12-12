const { DataTypes } = require('sequelize');
const connection = require('../config/database');

const Profissional = connection.define('Profissional', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especialidade: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Profissional;
