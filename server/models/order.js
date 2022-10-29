exports.defineOrder = (sequelize, DataTypes) => {
    return sequelize.define("order", {
        price: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2)
        },
        expirationDate: {
            allowNull: false,
            type: DataTypes.DATEONLY()
        }
    });
}

exports.defineRelation = (Order, User) => {
    Order.belongsTo(User);
}