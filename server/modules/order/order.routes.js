const router = require("express").Router();
const order = require("./order.middlewares");
const auth = require("../../services/auth");

router.use("/order", auth.isAuthenticated);
router.route("/order").get(order.getOrders)
router.route("/order").post(order.createOrder);
router.route("/order").put(order.updateOrders);
router.route("/order/:id").delete(order.deleteOrder);

module.exports = router;