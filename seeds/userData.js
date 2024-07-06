const {User} = require("../models");

const userData = [
    {
        user_name: "Thinh",
        password: "123456",
    },
    {
        user_name: "Ngoc",
        password: "123456"
    }
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true
});

module.exports = seedUser;