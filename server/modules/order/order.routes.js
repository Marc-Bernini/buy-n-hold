const router = require("express").Router();
const order = require("./order.middlewares");
const auth = require("../../services/auth");

router.route("/orders").get(auth.isAuthenticated, order.getOrders)
router.route("/order").post(auth.isAuthenticated, order.createOrder);
router.route("/orders").put(auth.isAuthenticated, order.updateOrders);
router.route("/order/:id").delete(auth.isAuthenticated, order.deleteOrder);

module.exports = router;