const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.redirect("/login");
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.redirect("/login");
    }
};
