const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ where: { user_name: req.body.user_name } });
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