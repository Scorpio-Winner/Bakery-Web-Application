const sequelize = require('.');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  birthDate: { type: DataTypes.DATE, allowNull: false },
  description: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

const Product = sequelize.define('Product', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

const Basket = sequelize.define('Basket', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketItem = sequelize.define('BasketItem', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

const Order = sequelize.define('Order', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  deliveryAddress: { type: DataTypes.STRING, allowNull: false },
  totalCost: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  completionTime: { type: DataTypes.STRING, allowNull: true },
});

const Admin = sequelize.define('Admin', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

const Review = sequelize.define('Review', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  shortReview: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Admin.hasMany(Order);
Order.belongsTo(Admin);

Order.hasOne(Review);
Review.belongsTo(Order);

Basket.belongsToMany(Product, { through: BasketItem });
Product.belongsToMany(Basket, { through: BasketItem });

module.exports = {
  User,
  Product,
  Basket,
  BasketItem,
  Order,
  Admin,
  Review, 
};