const path = require("path");
const express = require("express");
const session = require("express-session");
const expressHandlebars = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const routes = require("./controllers");
const sequelize = require("./config/connection");
const handlebars = expressHandlebars.create({});

const sess = {
    secret: "test123",
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
};
app.use(session(sess));
app.use((req, res, next) => {
    if(req.session.loggedIn === undefined)
        req.session.loggedIn = false;
    console.log("req.session.loggedIn :>> ", req.session.loggedIn);
    next();
})

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use((req, res, next) => {
    console.log('Session:', req.session);
    next();
});

app.use(routes);

const PORT = process.env.PORT || 3001;

console.log();

sequelize.sync().then(() => {
    app.listen(PORT, () => { console.log("Listening on ", PORT); });
});