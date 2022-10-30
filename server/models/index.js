const { Sequelize, DataTypes } = require('sequelize');
const userModule = require("./user");
const orderModule = require("./order");


const sequelize = new Sequelize(
  `${process.env.DB_USER}://postgres:${process.env.DB_PASSWORD}@127.0.0.1:5432/${process.env.DB_NAME}`
  );

async function intializeDBandModels() {
    try {
        await sequelize.sync();
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
} 

const User = userModule.defineUser(sequelize, DataTypes);
const Order = orderModule.defineOrder(sequelize, DataTypes);
userModule.defineRelation(User, Order);
orderModule.defineRelation(Order, User);

intializeDBandModels();

const models = {
  DataTypes,
  sequelize,
  User,
  Order
};

module.exports = models;
