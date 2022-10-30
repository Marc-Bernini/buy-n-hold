const orderService = require("./order.services");

exports.createOrder = async (req, res, next) => {
    try {
        const { price } = req.body;
        const { user } = req;
        const order = { price };
        const newOrder = await orderService.create(order);
        await user.addOrder(newOrder);
        return res.status(201).json({ "OK": true });
    } catch (error) {
        next(error);
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await orderService.findAllWithUsers();
        const {user} = req;
        res.status(200).json({orders, user})
    } catch (error) {
        next(error);
    }
}

exports.updateOrders = async (req, res, next) => {
    try {
        const orders = req.body;
        await orderService.updateOrdersPrice(orders);
        res.status(200).json({"OK": true});
    } catch (error) {
        next(error);
    }
}