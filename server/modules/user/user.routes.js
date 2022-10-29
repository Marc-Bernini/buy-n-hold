const router = require("express").Router();
const user = require("./user.middlewares");

router.route("/user").post(user.createUser);

module.exports = router;