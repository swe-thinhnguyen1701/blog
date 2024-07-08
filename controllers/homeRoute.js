const router = require("express").Router();
const { Poster, User } = require("../models");

router.get("/", async (req, res) => {
    try {
        const posterData = await Poster.findAll({
            include: [{ model: User, attributes: ["user_name"] }]
        });
        const posters = posterData.map(poster => poster.get({ plain: true }));
        res.render("homepage", { posters, loggedIn: req.session.loggedIn, isDashboard: false });
    } catch (error) {
        console.error("ERROR occurs while getting home page\n", error);
        res.status(500).json({ message: "Internal error occurs, please try again later!" });
    }
});

router.get("/login", async (req, res) => {
    if (req.session.loggedIn) {
        res.render("/");
        return;
    }
    res.render("login", {isDashboard: false});
})

router.get("/signup", (req, res) => {
    res.render("signup", {isDashboard: false});
});

router.get("/dashboard", (req, res) => {
    if(!req.session.loggedIn)
        res.render("dashboard", {loggedIn: req.session.loggedIn, isDashboard: true});
})

module.exports = router;