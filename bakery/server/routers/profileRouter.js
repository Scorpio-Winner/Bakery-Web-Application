const { Router } = require("express");
const userController = require("../controllers/userController");

const router = new Router();

router.get("/user/profile/:id", userController.getOne);

module.exports = router;