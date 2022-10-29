

exports.createUser = (req, res, next) => {
    try {
        const {username, password} = req.body;
        return res.status(201);
    } catch (error) {
        next(error);
    }
}