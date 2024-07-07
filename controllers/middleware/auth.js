const auth = async (req, res, next) => {
    if(!req.sessions.loggin)
        res.redirect("/login");
    else
        next();
}

module.exports = auth;