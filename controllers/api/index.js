const router = require("express").Router();

const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const dashboardRoutes = require("./dashboard");
const signupRoutes = require("./signup");

router.use("/users", loginRoutes);
router.use("/users", logoutRoutes);
router.use("/users", dashboardRoutes);

module.exports = router;