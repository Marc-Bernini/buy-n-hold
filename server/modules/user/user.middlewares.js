const bcryptService = require("../../services/bcrypt");
const userService = require("./user.services");

exports.createUser = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const hashPassword = await bcryptService.hash(password);
        const user = {
            username,
            password: hashPassword
        };
        const newUser = await userService.create(user);
        return res.status(201);
    } catch (error) {
        next(error);
    }
}