const jwtService = require("../services/jwt");
const userService = require("../modules/user/user.services");

exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(403).send("Opération interdite");
        }
        const decodedToken = jwtService.verify(token);
        const user = await userService.findByPk(decodedToken.id);
        if (!user) {
            return res.status(403).send("Opération interdite");
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.message === "jwt malformed") {
            return res.status(403).send("Opération interdite");
        }
        return res.status(401).send("Accès interdit");
    }
}