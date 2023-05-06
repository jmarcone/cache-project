const { default: axios } = require("axios");
const { cryptoCache } = require("../middleware/cache");
const { cryptoApi } = require("../services/crypto.services");

const cryptoController = async (req, res) => {
    try {
        //here we check for an specific ket before making a remote API call, but it could also be a call to SQL or cpu intensive function
        if (cryptoCache.has("crypto-list")) {
            console.log("using manual cache!");
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

const remoteMiddlewareControllerPost = async (req, res) => {
    try {
        const {remoteUrl, cacheKey} = req.body;
        const {data} = await axios.get(remoteUrl);
        cryptoCache.set(cacheKey, data);

        res.send(data);
    } catch (err) {
        console.log("error");
        console.log(err);
        
        throw err;
    }
};

const remoteMiddlewareControllerGet = async (req, res) => {
    try {
        const {remoteUrl, cacheKey} = req.query;
        const {data} = await axios.get(remoteUrl);
        cryptoCache.set(cacheKey, data);

        res.send(data);
    } catch (err) {
        console.log("error");
        console.log(err);
        
        throw err;
    }
};

module.exports = {
    cryptoController,
    remoteMiddlewareControllerPost,
    remoteMiddlewareControllerGet
};