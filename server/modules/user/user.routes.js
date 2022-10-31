const router = require("express").Router();
const user = require("./user.middlewares");
const auth = require("../../services/auth");

router.route("/user").post(user.createUser);
router.use("/user", auth.isAuthenticated);
router.route("/user").get(user.getUsers);

module.exports = router;