const { BasketItem } = require('../models/models');

class BasketItemController {
  
    async setProductToBasket(req, res) {
        const { basketId, productId, quantity } = req.body;

        try {
            // Проверяем, существует ли запись с таким basketId и productId
            const existingBasketItem = await BasketItem.findOne({
                where: {
                    basketId: basketId,
                    productId: productId,
                },
            });

            if (existingBasketItem) {
                return res.status(400).json({ error: 'Запись уже существует' });
            }

            // Создаем новую запись в таблице BasketItem
            const newBasketItem = await BasketItem.create({
                basketId,
                productId,
                quantity,
            });

            return res.status(201).json(newBasketItem);
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }
}

  
  module.exports = new BasketItemController();