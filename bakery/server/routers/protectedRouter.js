const { Router } = require("express");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const basketItemController = require("../controllers/basketItemController");
const orderController = require("../controllers/orderController");

const router = new Router();

router.get("/user", userController.getProfile);
router.put("/user/update/:id", userController.update);

router.post("/product-to-basket", basketItemController.setProductToBasket);
router.get("/basket-to-order/:id", basketItemController.getProductToOrderForm);
router.delete("/delete-items/:basketId", basketItemController.deleteItemsByBasketId);



router.post("/create-order", orderController.createOrder);










router.get("/admins", adminController.getAll);

module.exports = router;