const router = require("express").Router();

const loginRoutes = require("./login");
const signupRoutes = require("./signup");

router.use("/users", loginRoutes);

module.exports = router;