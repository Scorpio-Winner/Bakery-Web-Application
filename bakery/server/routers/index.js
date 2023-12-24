const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')
const productRouter = require('./productRouter')
const profileRouter = require('./profileRouter')
const protectedRouter = require("./protectedRouter");
const authMiddleware = require("../middleware/authMiddleware");

router.use('/auth', authRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)
router.use('/device', productRouter)
router.use('/device', profileRouter)
router.use("/api", authMiddleware, protectedRouter);

module.exports = router