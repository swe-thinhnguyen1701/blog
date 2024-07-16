const router = require("express").Router();
const auth = require("./middleware/auth");
const { Poster, User, Comment } = require("../models");

router.get("/", async (req, res) => {
    try {
        const posterData = await Poster.findAll({
            include: [{ model: User, attributes: ["user_name"] }]
        });
        const posters = posterData.map(poster => poster.get({ plain: true }));
        console.log(posters);
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
    console.log(userData);
    const posters = userData.posters.map(post => post.get({plain: true}));
    res.render("dashboard", { posters, loggedIn: req.session.loggedIn, isDashboard: true });
});

router.get("/dashboard/post/:id", auth, async (req, res) => {
    try {
        const postData = await Poster.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: "Cannot find post with given id\n" });
            return;
        }
        const post = postData.get({ plain: true });
        res.render("post-editor", {post, loggedIn: true});
    } catch (error) {
        console.error("ERROR occurs while fetching data from dashboard/post/:id\n", error);
        res.send(500).json({ message: "Internal error occurs, please try again later" });
    }
});

router.get("/post/:id", auth, async (req, res) => {
    const postData = await Poster.findOne({
        where: {id: req.params.id},
        include: [{ model: User, attributes: ["user_name"]}]
    });
    if(!postData) {
        res.status(404).json({message: "Cannot find a post with given ID"});
        return;
    };
    const commentData = await Comment.findAll({
        where: {poster_id: req.params.id},
        include: [{model: User, attributes: ["user_name"]}]
    });
    const comments = commentData.map(comment => comment.get({plain: true}));
    const post = postData.get({plain: true});
    res.render("post-comment", {post, comments, loggedIn: true});
});

module.exports = router;