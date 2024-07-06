const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedPoster = require("./posterData");
const seedComment = require("./commentData");

const seedAll = async () => {
    await sequelize.sync({ force: true});

    await seedUser();

    await seedPoster();

    await seedComment();

    process.exit(0);
}

seedAll();