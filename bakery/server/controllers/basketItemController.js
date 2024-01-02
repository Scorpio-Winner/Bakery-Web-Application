const { BasketItem } = require('../models/models');

class BasketItemController {
  
    async setProductToBasket(req, res) {
        const { basketId, productId, quantity } = req.body;

        try {
            // Создание новой записи в таблице BasketItem
            const newBasketItem = await BasketItem.create({
                basketId,
                productId,
                quantity,
            });


            return res.status(201).json(newBasketItem);
        } catch (err) {
            return res.sendStatus(500);
        }
    }
  }
  
  module.exports = new BasketItemController();