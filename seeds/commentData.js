const {Comment} = require("../models");

const commentData = [
    {
        content: "comment 1",
        user_id: 1,
        poster_id: 1,
    },
    {
        content: "comment 2",
        user_id: 1,
        poster_id: 1,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;