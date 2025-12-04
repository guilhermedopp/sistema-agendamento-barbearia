const Servico = require('../models/Servico');

module.exports = {
    // GET /servicos
    async index(req, res) {
        try {
            // Busca tudo no sqlite
            const servicos = await Servico.findAll();
            return res.render('servicos/index', { servicos });
        } catch (error) {
            console.error(error);
            return res.status(500).send("Erro ao buscar servicos");
        }
    },

    // Mostra o formulário
    create(req, res) {
        return res.render('servicos/create');
    },

    // POST /servicos
    async store(req, res) {
        try {
            const { nome, duracaoMin, preco } = req.body;

            // Validação
            if (!nome || !duracaoMin || !preco) {
                return res.send("Erro: Todos os campos devem ser preenchidos");
            }

            await Servico.create({ nome, duracaoMin, preco });
            return res.redirect('/servicos');
        } catch (error) {
            console.error(error);
            return res.status(500).send("Erro ao salvar serviço");
        }
    }
};