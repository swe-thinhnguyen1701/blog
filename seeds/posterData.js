const { Poster } = require("../models");

const posterData = [
    {
        title: "Why MVC is so important",
        content: "MVC allows developers to maintain a true separation of cncerns, devising their code between the Model layer for data, the View layer fro design, and the Controller layer for application",
        userId: 1
    },
    {
        title: "Authentication vs. Authorization",
        content: "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
        userId: 1
    }
];

const seedPoster = () => Poster.bulkCreate(posterData);

module.exports = seedPoster;