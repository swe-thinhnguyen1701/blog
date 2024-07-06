const router = require("express").Router();
const { Poster, User } = require("../models");

router.get("/", async (req, res) => {
    const posterData = await Poster.findAll({
        include: [{ model: User, attributes: ["user_name"] }]
    });
    const posters = posterData.map(poster => poster.get({ plain: true }));
    console.log(posters);
    res.render("homepage", { posters });
});


module.exports = router;