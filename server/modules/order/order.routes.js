const router = require("express").Router();
const order = require("./order.middlewares");
const auth = require("../../services/auth");

router.use("/order", auth.isAuthenticated);
router.route("/order").post(order.createOrder);

module.exports = router;