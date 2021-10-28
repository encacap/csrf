const express = require("express");

const homeController = require("../controllers/home.controller");

const router = express.Router();

/* GET home page. */
router.route("/").get(homeController.renderFakePage);

module.exports = router;
