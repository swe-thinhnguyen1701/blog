const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
    try {
        console.log("BACKEND");
        console.log("userName :>>", req.body.username);
        console.log("pasword :>>", req.body.password);
        const user = await User.findOne({ where: { user_name: req.body.username } });
        console.log(user);
        if (!user || !user.isPasswordMatched(req.body.password)) {
            res.status(400).json({ message: "Incorrect username or password. Please try again" });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = user.id;
            res.status(200).json({ user, message: "You are logged in!" });
        });
    } catch (error) {
        console.error("Error occurs while logging in\n", error);
        res.status(500).json("Internal error. Please try again later");
    }
});

module.exports = router;