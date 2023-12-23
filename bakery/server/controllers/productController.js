const { Product } = require('../models/models');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      return res.status(200).json({ products });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async getProduct(req, res) {
    const { productId } = req.params;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: 'Продукт не найден' });
      }

      return res.status(200).json({ product });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
}

module.exports = new ProductController();