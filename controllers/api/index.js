const router = require("express").Router();

const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const signupRoutes = require("./signup");

router.use("/users", loginRoutes);
router.use("/users", logoutRoutes);

module.exports = router;