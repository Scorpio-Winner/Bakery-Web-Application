const { Router } = require("express");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

const router = new Router();

router.get("/users", userController.getAll);
router.get("/admins", adminController.getAll);

module.exports = router;