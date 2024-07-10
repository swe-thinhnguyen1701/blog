const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/comment", async (req, res) => {
    try {
        const comment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            poster_id: req.body.poster_id
        });

        res.status(200).json({ message: "new comment is added" });
    } catch (error) {
        console.error("ERROR occurs while creating new comment\n", error);
        res.status(500).json({ message: "Internal error, please try again later!" });
    }
});

module.exports = router;