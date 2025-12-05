const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    loginForm(req, res) {
        return res.render('auth/login', { erro: null });
    },

    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario || !await bcrypt.compare(senha, usuario.senha)) {
                return res.render('auth/login', { erro: 'Email ou senha incorretos!' });
            }

            const token = jwt.sign(
                { id: usuario.id, nome: usuario.nome },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            res.cookie('jwt', token, { 
                httpOnly: true, 
                maxAge: 28800000
            });

            return res.redirect('/agendamentos');

        } catch (error) {
            return res.render('auth/login', { erro: 'Erro interno ao realizar login.' });
        }
    },

    logout(req, res) {
        res.clearCookie('jwt');
        return res.redirect('/login');
    },

    registerForm(req, res) {
        return res.render('auth/register');
    },

    async registrar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            await Usuario.create({ nome, email, senha });
            return res.redirect('/login');
        } catch (error) {
            console.error(error);
            return res.redirect('/registrar');
        }
    }
};