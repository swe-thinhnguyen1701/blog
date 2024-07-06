const path = require("path");
const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();
const routes = require("./controllers");
const sequelize = require("./config/connection");
const handlebars = expressHandlebars.create({});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(routes);

const PORT = process.env.PORT || 3001;

console.log();

sequelize.sync().then(() => {
    app.listen(PORT, () => { console.log("Listening on ", PORT); });
});