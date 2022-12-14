const bcrypt = require("bcrypt");

exports.hash = password => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    return bcrypt.hash(password, saltRounds);
}

exports.compare = (password, hashPassword) => bcrypt.compare(password, hashPassword);