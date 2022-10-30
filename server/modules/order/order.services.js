const models = require("../../models");

exports.create = order => {
    return models.Order.create(order);
}

exports.findAllWithUsers = () => {
    return models.Order.findAll({
        attributes: ["id", "price", "expirationDate"],
        include: [
            {
                model: models.User,
                attributes: ["id", "username"]
            }
        ]
    });
}