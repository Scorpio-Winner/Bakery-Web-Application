const { Router } = require("express");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

const router = new Router();

router.get("/user", userController.getProfile);
router.put("/user/update/:id", userController.update);





router.get("/admins", adminController.getAll);

module.exports = router;