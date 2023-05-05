const { Router } = require("express");
const router = Router();
const { cryptoController, cryptoMiddlewareController } = require("./controllers/crypto.controllers");
const { cacheMiddleware } = require("./middleware/cache");

router.get("/", (req, res) => {
    res.send("Cache Project Home Page");
    res.status(200);
});
router.get("/crypto-middleware", cacheMiddleware, cryptoMiddlewareController);

router.get("/crypto",  cryptoController);

module.exports = router;