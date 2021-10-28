const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const renderLoginForm = (req, res) => {
    res.render(path.join("pages", "login"), {});
};

const doLogin = async (req, res, next) => {
    const { username, password: plainPassword } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        next(new Error("User not found!"));
        return;
    }
    const { password } = user;
    try {
        await bcrypt.compare(plainPassword, password);
    } catch (error) {
        next(new Error("Username or password is incorrect!"));
        return;
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.cookie("token", token).redirect("/");
};

module.exports = {
    renderLoginForm,
    doLogin,
};
