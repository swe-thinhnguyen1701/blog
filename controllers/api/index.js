const router = require("express").Router();

const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const dashboardRoutes = require("./dashboard");
const signupRoutes = require("./signup");
const commentRoutes = require("./comment");

router.use("/users", loginRoutes);
router.use("/users", logoutRoutes);
router.use("/users", dashboardRoutes);
router.use("/users", signupRoutes);
router.use("/users", commentRoutes);

module.exports = router;