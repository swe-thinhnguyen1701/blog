const {Comment} = require("../models");

const commentData = [
    {
        content: "Hello world",
        userId: 1,
        poster_id: 1,
    },
    {
        content: "Hello world",
        userId: 1,
        poster_id: 1,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;