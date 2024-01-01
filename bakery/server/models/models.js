const sequelize = require('.');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  birth_date: { type: DataTypes.DATE, allowNull: false },
  description: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },

},
{timestamps: false});

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
},
{timestamps: false});

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
},
{timestamps: false});

const BasketItem = sequelize.define('basketItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
},
{timestamps: false});

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  delivery_address: { type: DataTypes.STRING, allowNull: false },
  total_cost: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  completion_time: { type: DataTypes.STRING, allowNull: true },
},
{timestamps: false});

const Admin = sequelize.define('admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
},{timestamps: false});

const Review = sequelize.define('review', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  short_review: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
},
{timestamps: false});

User.hasOne(Basket);
Basket.hasOne(User);

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