const { Router } = require("express");
const router = Router();
const { cryptoController, remoteMiddlewareControllerPost, remoteMiddlewareControllerGet } = require("./controllers/cacheController");
const { cacheMiddlewarePost, cacheMiddlewareGet } = require("./middleware/cache");

router.get("/", (req, res) => {
    res.send("Cache Project Home Page");
    res.status(200);
});

router.get("/crypto", cryptoController);

router.post("/remote-cache", cacheMiddlewarePost, remoteMiddlewareControllerPost);
router.get("/remote-cache", cacheMiddlewareGet, remoteMiddlewareControllerGet);

module.exports = router;