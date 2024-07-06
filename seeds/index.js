const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedPoster = require("./posterData");
const seedComment = require("./commentData");

const seedAll = async () => {
    try {
        console.log("Starting database synchronization...");
        await sequelize.sync({ force: true });
        console.log("Database synced\n\n");

        await seedUser();
        console.log("User synced\n\n");

        await seedPoster();
        console.log("Poster synced\n\n");

        await seedComment();
        console.log("Comment synced\n\n");

        process.exit(0);
    }catch(error){
        console.error("Fail to seed data: \n\n", error);
        process.exit(1);
    }
}

seedAll();