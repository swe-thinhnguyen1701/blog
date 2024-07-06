const {User} = require("../models");

const userData = [
    {
        userName: "Thinh",
        password: "123456",
    },
    {
        userName: "Ngoc",
        password: "123456"
    }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;