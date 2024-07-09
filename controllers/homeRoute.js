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
    const posters = userData.posters.map(post => post.get({plain: true}));
    // const userPost = userPostData.map(post => post.get({plain: true}));
    console.log("postList :>>", posters);
    res.render("dashboard", { posters, loggedIn: req.session.loggedIn, isDashboard: true });
});

router.get("/dashboard/post/:id", async (req, res) => {
    try {
        const postData = await Poster.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: "Cannot find post with given id\n" });
            return;
        }
        const post = postData.get({ plain: true });
        res.render("post-editor", post);
    } catch (error) {
        console.error("ERROR occurs while fetching data from dashboard/post/:id\n", error);
        res.send(500).json({ message: "Internal error occurs, please try again later" });
    }
});

module.exports = router;