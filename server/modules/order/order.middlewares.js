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