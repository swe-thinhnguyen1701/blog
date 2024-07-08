const router = require("express").Router();
const auth = require("./middleware/auth");
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
    res.render("login", { isDashboard: false });
})

router.get("/signup", (req, res) => {
    res.render("signup", { isDashboard: false });
});

router.get("/dashboard", auth, async (req, res) => {
    const user_id = req.session.user_id;
    const userData = await User.findOne({where: {id: user_id}, include: [{model: Poster}]});
    const postList = userData.posters.map(post => post.get({plain: true}));
    // const userPost = userPostData.map(post => post.get({plain: true}));
    console.log("postList :>>", postList);
    res.render("dashboard", { loggedIn: req.session.loggedIn, isDashboard: true });
})

module.exports = router;