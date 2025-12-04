const Agendamento = require('../models/Agendamento');
const Profissional = require('../models/Profissional');
const Servico = require('../models/Servico');
const { Op } = require('sequelize'); // Necessário para filtros avançados

module.exports = {
    // Lista agendamentos por data
    async index(req, res) {
        const agendamentos = await Agendamento.findAll({
            include: [Profissional, Servico],
            order: [['dataHora', 'ASC']] // Mostra os mais recentes primeiro
        });
        return res.render('agendamentos/index', { agendamentos });
    },

    // Mostra o formulário
    async create(req, res) {
        const profissionais = await Profissional.findAll();
        const servicos = await Servico.findAll();
        return res.render('agendamentos/create', { profissionais, servicos });
    },

    // Salva com validações inteligentes
    async store(req, res) {
        const { profissionalId, servicoId, data, hora } = req.body;
        
        // Cria o objeto Data do Javascript com o que veio do formulário
        const inicioAgendamento = new Date(`${data}T${hora}`);

        // Regra 1: Não permite agendamento no passado
        if (inicioAgendamento < new Date()) {
            return res.send(`
                <h2>Erro: Data Inválida</h2>
                <p>Você não pode agendar para uma data ou hora que já passou.</p>
                <a href="/agendamentos/criar">Tentar novamente</a>
            `);
        }
        
        // Quanto tempo dura o serviço novo
        const servicoNovo = await Servico.findByPk(servicoId);

        // --- PROTEÇÃO: Se o serviço não for encontrado, para aqui ---
        if (!servicoNovo) {
            return res.send("Erro: Serviço não encontrado ou inválido!");
        }

        // Calcula a hora esse serviço vai acabar
        const fimAgendamento = new Date(inicioAgendamento.getTime() + servicoNovo.duracaoMin * 60000);

        // Busca todos os agendamentos desse profissional que não foram cancelados
        const agendamentosDoProfissional = await Agendamento.findAll({
            where: {
                ProfissionalId: profissionalId,
                status: 'agendado'
            },
            include: [Servico] // Verifica o tempo de serviço pelos serviços antigos
        });

        // Verifica os horários
        let temConflito = false;
        
        agendamentosDoProfissional.forEach(agendamentoAntigo => {
            const inicioVelho = new Date(agendamentoAntigo.dataHora);
            const fimVelho = new Date(inicioVelho.getTime() + agendamentoAntigo.Servico.duracaoMin * 60000);

            // Validação de conflito
            if (inicioAgendamento < fimVelho && fimAgendamento > inicioVelho) {
                temConflito = true;
            }
        });

        if (temConflito) {
            return res.send(`
                <h2>Erro: Horário Indisponível!</h2>
                <p>O profissional <strong>já tem um atendimento</strong> neste intervalo.</p>
                <p>Tente escolher outro horário.</p>
                <a href="/agendamentos/criar">Voltar</a>
            `);
        }

        await Agendamento.create({
            ProfissionalId: profissionalId,
            ServicoId: servicoId,
            dataHora: inicioAgendamento,
            status: 'agendado'
        });

        return res.redirect('/agendamentos');
    },

    // Atualiza status para cancelado
    async cancelar(req, res) {
        const { id } = req.params;
        await Agendamento.update({ status: 'cancelado' }, { where: { id } });
        return res.redirect('/agendamentos');
    },

    // Atualiza status para realizado
    async concluir(req, res) {
        const { id } = req.params;
        await Agendamento.update({ status: 'realizado' }, { where: { id } });
        return res.redirect('/agendamentos');
    }
};