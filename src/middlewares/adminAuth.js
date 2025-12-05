const adminAuth = (req, res, next) => {
    if (req.usuarioAdmin === true) {
        next();
    } else {
        res.status(403).send("Acesso negado: Apenas administradores");
    }
};

module.exports = adminAuth;