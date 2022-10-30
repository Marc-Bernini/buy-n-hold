const jwt = require("jsonwebtoken");

exports.sign = payload => {
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const algorithm = process.env.JWT_ALGORITHM;
    return jwt.sign(payload, privateKey, {algorithm});
}

exports.verify = token => {
    const privateKey = process.env.JWT_PRIVATE_KEY;
    return jwt.verify(token, privateKey);
}