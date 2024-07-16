const router = require("express").Router();
const {User} = require("../../models");

router.post("/signup", async (req, res) => {
    try {
        const isUserExist = await User.findOne({ where: { user_name: req.body.username } });
        if (isUserExist) {
            res.status(400).json({ message: "Username has been used!" });
            return;
        }

        const newUser = await User.create({
            user_name: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = newUser.id;
            res.status(200).json({ newUser });
        })
    }catch(error){
        console.error("ERROR occurs while signing up\n", error);
        res.status(500).json({message: "Internal error, please try again later!"});
    }
});

module.exports = router;