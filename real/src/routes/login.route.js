const express = require("express");

const loginController = require("../controllers/login.controller");

const router = express.Router();

router.route("/").get(loginController.renderLoginForm).post(loginController.doLogin);

module.exports = router;
