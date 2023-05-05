const { cryptoCache } = require("../middleware/cache");
const { cryptoApi } = require("../services/crypto.services");

const cryptoController = async (req, res) => {
    try {
        if (cryptoCache.has("crypto-list")) {
            return res.send(cryptoCache.get("crypto-list")).status(200);
        }
        const data = await cryptoApi(25);
        cryptoCache.set("crypto-list", data);


        res.send(data);
        res.status(200);
    } catch (err) {
        res.status(500);
        console.log(err);
        throw err;
    }
};

const cryptoMiddlewareController = async (req, res) => {
    try {
        const data = await cryptoApi(25);

        cryptoCache.set(req.originalUrl, data);

        res.send(data);
        res.status(200);
    } catch (err) {
        res.status(500);
        console.log(err);
        throw err;
    }
};

module.exports = {
    cryptoController,
    cryptoMiddlewareController
};