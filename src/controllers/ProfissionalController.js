const Profissional = require('../models/Profissional');

module.exports = {
    // GET /profissionais
    async index(req, res) {
        try {
            const profissionais = await Profissional.findAll();
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
            const { nome, especialidade, telefone } = req.body;

            if (!nome || !especialidade) {
                return res.send("Erro: Campos obrigatórios vazios <a href='/profissionais/criar'>Voltar</a>");
            }

            await Profissional.create({ nome, especialidade, telefone });
            return res.redirect('/profissionais');
        } catch (error) {
            console.error(error);
            return res.status(500).send("Erro ao cadastrar profissional");
        }
    },

    // GET /profissionais/:id/editar
    async edit(req, res) {
        try {
            const { id } = req.params;
            const profissional = await Profissional.findByPk(id);

            if (!profissional) {
                return res.redirect('/profissionais');
            }

            return res.render('profissionais/edit', { profissional });
        } catch (error) {
            console.log(error);
            return res.redirect('/profissionais');
        }
    },

    // POST /profissionais/:id/atualizar
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, especialidade, telefone } = req.body;

            await Profissional.update(
                { nome, especialidade, telefone },
                { where: { id } }
            );

            return res.redirect('/profissionais');
        } catch (error) {
            console.log(error);
            return res.redirect('/profissionais');
        }
    },

    // POST /profissionais/:id/deletar
    async destroy(req, res) {
        try {
            const { id } = req.params;
            await Profissional.destroy({ where: { id } });
            return res.redirect('/profissionais');
        } catch (error) {
            console.error(error);
            return res.status(500).send("Erro ao deletar profissional");
        }
    }
};