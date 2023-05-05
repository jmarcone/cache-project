const Cache = require("node-cache");
const cryptoCache = new Cache({ stdTTL: 60 * 5 });

const cacheMiddleware = (req, res, next) => {
    try {
        const originalUrl = req.originalUrl;

        if (cryptoCache.has(originalUrl)) {
            return res.send(cryptoCache.get(originalUrl)).status(200);
        }
        return next();
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    cacheMiddleware,
    cryptoCache,
};