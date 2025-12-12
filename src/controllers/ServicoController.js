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

    // GET /servicos/criar (Mostra o formulário)
    create(req, res) {
        return res.render('servicos/create');
    },

    // POST /servicos (Salva novo)
    async store(req, res) {
        try {
            const { nome, duracaoMin, preco } = req.body;

            // Validação
            if (!nome || !duracaoMin || !preco) {
                return res.send("Erro: Todos os campos devem ser preenchidos <a href='/servicos/criar'>Voltar</a>");
            }

            await Servico.create({ nome, duracaoMin, preco });
            
            // Volta pra lista
            return res.redirect('/servicos');
        } catch (error) {
            console.error(error);
            return res.status(500).send("Erro ao salvar serviço");
        }
    },

    // GET /servicos/:id/editar
    async edit(req, res) {
        try {
            const { id } = req.params;
            const servico = await Servico.findByPk(id);

            if (!servico) {
                return res.redirect('/servicos');
            }

            return res.render('servicos/edit', { servico });
        } catch (error) {
            console.log(error);
            return res.redirect('/servicos');
        }
    },

    // POST /servicos/:id/atualizar (Salva as alterações)
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, duracaoMin, preco } = req.body;

            await Servico.update(
                { nome, duracaoMin, preco },
                { where: { id } }
            );

            return res.redirect('/servicos');
        } catch (error) {
            console.log(error);
            return res.redirect('/servicos');
        }
    },

    // POST /servicos/:id/deletar
    async destroy(req, res) {
        try {
            const { id } = req.params;

            // Apaga do banco pelo ID
            await Servico.destroy({ where: { id } });

            // Volta pra lista
            return res.redirect('/servicos');
        } catch (error) {
            console.error(error);
            return res.status(500).send("Erro ao deletar serviço");
        }
    }
};