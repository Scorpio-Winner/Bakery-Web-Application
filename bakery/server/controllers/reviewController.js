const { Review, Order } = require('../models/models');

class ReviewController {
  async createReview(req, res) {
    const { rating, shortReview, description, orderId } = req.body;

    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.status(404).json({ error: 'Заказ не найден' });
      }

      if (order.status !== 'Выполнен') {
        return res.status(400).json({ error: 'Отзыв можно оставить только для выполненных заказов' });
      }

      const review = await Review.create({
        rating,
        shortReview,
        description,
        OrderId: orderId
      });

      return res.status(201).json({ review });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async getAllReviews(req, res) {
    try {
      const reviews = await Review.findAll();
      return res.json(reviews);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
}

module.exports = new ReviewController();