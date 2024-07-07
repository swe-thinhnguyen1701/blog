const router = require("express").Router();
const {User} = require("../../models");

router.post("/", async (req, res) => {
    try {
        const isUserExist = await User.findOne({ where: { user_name: req.body.user_name } });
        if (isUserExist) {
            res.status(400).json({ messge: "User has been used!" });
            return;
        }

        const newUser = await User.create({
            user_name: req.body.user_name,
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