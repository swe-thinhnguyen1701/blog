const path = require("path");
const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();
const sequelize = require("./config/connection");

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
    app.listen(PORT, () => { console.log("Listening on ", PORT); });
})