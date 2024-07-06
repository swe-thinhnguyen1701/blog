const {Comment} = require("../models");

const commentData = [
    {
        content: "Hello world",
        userId: 1,
        posterId: 1,
    },
    {
        content: "Hello world",
        userId: 1,
        posterId: 1,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;