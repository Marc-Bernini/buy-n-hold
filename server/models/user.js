exports.defineUser = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        username: {
            allowNull: false,
            type: DataTypes.STRING(20)
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(100)
        }
    });
};

exports.defineRelation = (User, Order) => {
    User.hasMany(Order);
}