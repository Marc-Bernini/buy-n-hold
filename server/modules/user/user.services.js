const models = require("../../models");

exports.create = user => {
    return models.User.create(user);
}