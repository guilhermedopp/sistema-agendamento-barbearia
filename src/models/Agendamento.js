const { DataTypes } = require('sequelize');
const connection = require('../config/database');

// Vincula os outros models
const Profissional = require('../models/Profissional');
const Servico = require('../models/Servico');

const Agendamento = connection.define('Agendamento', {
    dataHora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('agendado', 'cancelado', 'realizado'),
        defaultValue: 'agendado',
        allowNull: false
    }
});

// Relacionamentos (FK)

// Um agendamento pertence a um profissional
Agendamento.belongsTo(Profissional);
// Um profissional tem muitos agendamentos
Profissional.hasMany(Agendamento);

// Um agendamento pertence a um serviço
Agendamento.belongsTo(Servico);
// Um serviço tem muitos agendamentos
Servico.hasMany(Agendamento);

module.exports = Agendamento;