const Cache = require("node-cache");
//-1 to persist forever
const cacheLifeInSecond = 60 * 5;

//This object is the Cache intiself, you need to import it to get, set, or check data
const cryptoCache = new Cache({ stdTTL: cacheLifeInSecond });

//this is th middleware that use the cache that we just created
const cacheMiddlewarePost = (req, res, next) => {
    try {
        const {cacheKey} = req.body;

        if (cryptoCache.has(cacheKey)) {
            console.log("using middleware cache!");
            return res.send(cryptoCache.get(cacheKey)).status(200);
        }
        return next();
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const cacheMiddlewareGet = (req, res, next) => {
    try {
        const {cacheKey} = req.query ;

        // if (cryptoCache.has(cacheKey)) {
        //     console.log("using middleware cache!");
        //     return res.send(cryptoCache.get(cacheKey)).status(200);
        // }
        return next();
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    cacheMiddlewarePost,
    cacheMiddlewareGet,
    cryptoCache,
};