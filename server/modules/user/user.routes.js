const router = require("express").Router();
const user = require("./user.middlewares");
const auth = require("../../services/auth");

router.route("/user").post(user.createUser);
router.route("/users").get(auth.isAuthenticated, user.getUsers);

module.exports = router;