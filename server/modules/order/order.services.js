const models = require("../../models");

exports.create = order => {
    return models.Order.create(order);
}