const Agendamento = require('../models/Agendamento');
const Profissional = require('../models/Profissional');
const Servico = require('../models/Servico');
const { Op } = require('sequelize'); // Necessário para filtros avançados
const { validationResult } = require('express-validator'); // Importação para capturar erros

module.exports = {
    // Lista agendamentos por data
    async index(req, res) {
        // Lógica de Filtros
        const { data, status } = req.query;
        const where = {};

        // Se não for admin, só vê os próprios agendamentos
        if (!req.usuarioAdmin) {
            where.UsuarioId = req.usuarioId;
        }
        // ----------------------------

        if (status) {
            where.status = status;
        }

        if (data) {
            // Filtra o dia inteiro (das 00:00 até 23:59)
            const inicioDia = new Date(`${data}T00:00:00`);
            const fimDia = new Date(`${data}T23:59:59`);
            where.dataHora = { [Op.between]: [inicioDia, fimDia] };
        }

        const agendamentos = await Agendamento.findAll({
            where: where, // Aplica o filtro aqui
            include: [Profissional, Servico],
            order: [['dataHora', 'ASC']] // Mostra os mais recentes primeiro
        });
        return res.render('agendamentos/index', { agendamentos });
    },

    // Mostra o formulário
    async create(req, res) {
        const profissionais = await Profissional.findAll();
        const servicos = await Servico.findAll();
        return res.render('agendamentos/create', { profissionais, servicos, erros: [], dados: {} });
    },

    // Salva com validações inteligentes
    async store(req, res) {
        // Verifica se houve erro na validação da Rota
        const errosValidation = validationResult(req);
        if (!errosValidation.isEmpty()) {
            // Se tiver erro, recarrega a tela com as mensagens
            const profissionais = await Profissional.findAll();
            const servicos = await Servico.findAll();
            return res.render('agendamentos/create', { 
                profissionais, 
                servicos, 
                erros: errosValidation.array(),
                dados: req.body 
            });
        }

        const { profissionalId, servicoId, data, hora } = req.body;
        
        // Cria o objeto Data do Javascript com o que veio do formulário
        const inicioAgendamento = new Date(`${data}T${hora}`);

        // Não permite agendamento no passado
        if (inicioAgendamento < new Date()) {
            return res.send(`
                <h2>Erro: Data Inválida</h2>
                <p>Você não pode agendar para uma data ou hora que já passou.</p>
                <a href="/agendamentos/criar">Tentar novamente</a>
            `);
        }
        
        // Quanto tempo dura o serviço novo
        const servicoNovo = await Servico.findByPk(servicoId);

        // Se o serviço não for encontrado, para aqui
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
            status: 'agendado',
            // Salva o nome digitado OU o nome do usuário logado
            clienteNome: req.body.clienteNome || req.userNome, 
            // Vincula o agendamento ao usuário logado (Cliente)
            UsuarioId: req.usuarioId 
        });

        return res.redirect('/agendamentos');
    },

    // Atualiza status para cancelado
    async cancelar(req, res) {
        const { id } = req.params;
        // Se não for admin, só pode cancelar se for dono
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