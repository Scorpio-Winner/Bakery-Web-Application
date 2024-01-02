const { Order, Basket, Product } = require('../models/models');

class OrderController {
  async createOrder(req, res) {
    const { userId, name, delivery_address, total_cost, description, date_of_ordering } = req.body;
  
    try {
      const order = await Order.create({ 
        userId: userId, 
        name,
        delivery_address,
        total_cost,
        status: 'Сформирован',
        description,
        date_of_ordering
      });
  
      return res.status(201).json({ order });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
  

  async getOrder(req, res) {
    const { orderId } = req.params;

    try {
      const order = await Order.findByPk(orderId, { include: Product });

      if (!order) {
        return res.status(404).json({ error: 'Заказ не найден' });
      }

      return res.status(200).json({ order });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll({ include: Product });

      return res.status(200).json({ orders });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async updateOrderStatusInProgress(req, res) {
    const { orderId } = req.params;

    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.status(404).json({ error: 'Заказ не найден' });
      }

      order.status = 'В процессе';
      await order.save();

      return res.status(200).json({ message: 'Статус заказа обновлен' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async updateOrderStatusCancelled(req, res) {
    const { orderId } = req.params;

    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.status(404).json({ error: 'Заказ не найден' });
      }

      order.status = 'Отменен';
      await order.save();

      return res.status(200).json({ message: 'Статус заказа обновлен' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async updateOrderStatusCompleted(req, res) {
    const { orderId } = req.params;

    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.status(404).json({ error: 'Заказ не найден' });
      }

      order.status = 'Выполнен';
      await order.save();

      return res.status(200).json({ message: 'Статус заказа обновлен' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
}

module.exports = new OrderController();