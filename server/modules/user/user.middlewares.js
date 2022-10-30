const bcryptService = require("../../services/bcrypt");
const jwtService = require("../../services/jwt");
const userService = require("./user.services");

exports.createUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let passwordIsGood;
        let newUser;
        const existingUser = await userService.findByUsername(username);
        if (!existingUser) {
            const hashPassword = await bcryptService.hash(password);
            const user = {
                username,
                password: hashPassword
            };
            newUser = await userService.create(user);
        }
        if (existingUser) {
            passwordIsGood = await bcryptService.compare(password, existingUser.password);
        }
        if (!passwordIsGood && existingUser) {
            return res.status(401).send("Mot de passe incorrect");
        }
        const id = newUser?.id || existingUser.id;
        const jwtPayload = { id };
        const jwt = jwtService.sign(jwtPayload);
        return res.status(201).json({ jwt });
    } catch (error) {
        next(error);
    }
}