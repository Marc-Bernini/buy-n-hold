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
    }, {
        hooks: {
            beforeValidate: order => {
                const expirationDate = defineExpirationDate(order);
                console.log(expirationDate)
                return order.expirationDate = new Date(expirationDate);
            }
        }
    });
}

exports.defineRelation = (Order, User) => {
    Order.belongsTo(User);
}

function defineExpirationDate(order) {
    const fourteenDays = 14;
    const fourteenDaysDate = new Date().getDate() + fourteenDays;
    const dateInTwoWeeksTimeStamps = new Date().setDate(fourteenDaysDate);
    const dateInTwoWeeksObject = new Date(dateInTwoWeeksTimeStamps)
    const dateInTwoWeeks = dateInTwoWeeksObject.getDate();
    const monthInTwoWeeks = dateInTwoWeeksObject.getMonth() + 1;
    const yearInTwoWeeks = dateInTwoWeeksObject.getFullYear();
    return `${yearInTwoWeeks}/${monthInTwoWeeks}/${dateInTwoWeeks}`;
}