const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.jwt; // Pega o token do cookie

    if (!token) {
        return res.redirect('/login'); // Redireciona para a página de login se não tiver token    
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.usuarioId = decoded.id; // Salva o ID do usuário
        req.userNome = decoded.nome; // Salva o Nome do usuário para usar no controller
        req.usuarioAdmin = decoded.isAdmin; // Salva se é admin na requisição
        
        // Disponibiliza a variável isAdmin para todos os arquivos EJS
        res.locals.isAdmin = decoded.isAdmin;
        
        next();
    } catch (err) {
        res.clearCookie('jwt');
        return res.redirect('/login');
    }
};

module.exports = auth;