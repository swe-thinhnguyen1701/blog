const {User} = require("../models");

const userData = [
    {
        user_name: "thinh",
        password: "123456",
    },
    {
        user_name: "ngoc",
        password: "123456"
    }
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true
});

module.exports = seedUser;