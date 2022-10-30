const models = require("../../models");

exports.create = user => {
    return models.User.create(user);
}

exports.findByUsername = username => {
    return models.User.findOne({
        attributes: ["id", "password"],
        where: {
            username
        }
    });
}