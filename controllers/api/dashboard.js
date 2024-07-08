const router = require("express").Router();
const {Poster} = require("../../models");

router.post("/dashboard", async(req, res) => {
try{
    console.log("req.bodt.title :>>", req.body.title);
    console.log("req.body.content :>>", req.body.content);
    await Poster.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    });
    console.log("BACKEND new poster :>>", res);
    res.status(200).json({message: "Add new poster success!"});
}catch(error) {
    console.error("ERROR occurs while creating new post\n", error);
    res.status(500).json("Internal error, please try again!");
}


});

module.exports = router;