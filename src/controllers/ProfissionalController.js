const Profissional = require('../models/Profissional');

module.exports = {
    // GET /profissionais
    async index(req, res) {
        try {
            // Busca tudo no sqlite
            const profissionais = await Profissional.findAll();
            
            // Manda os dados pra view profissionais
            return res.render('profissionais/index', { profissionais });
        } catch (error) {
            console.error(error);
            return res.status(500).send("Erro ao buscar profissionais");
        }
    },

    // GET /profissionais/criar
    create(req, res) {
        return res.render('profissionais/create');
    },

    // POST /profissionais
    async store(req, res) {
        try {
            const { nome, especialidade } = req.body;

            // Validação de nao deixar salvar vazio
            if (!nome || !especialidade) {
                return res.send("Erro: Todos os campos devem ser preenchidos <a href='/profissionais/criar'>Voltar</a>");
            }

            // Cria no banco
            await Profissional.create({ nome, especialidade});

            // Volta pra lista principal
            return res.redirect('/profissionais');
        } catch (error) {
            console.error(error);
            return res.status(500).send("Erro ao cadastrar profissional");
        }
    }
};