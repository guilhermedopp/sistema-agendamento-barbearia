const { DataTypes } = require('sequelize');
const connection = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = connection.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (usuario) => {
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('senha')) {
                const salt = await bcrypt.genSalt(10);
                usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
        }
    }
});

module.exports = Usuario;