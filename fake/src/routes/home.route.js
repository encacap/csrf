const express = require("express");

const homeController = require("../controllers/home.controller");

const router = express.Router();

router.route("/tag").get(homeController.renderFakePageUsingTag);
router.route("/").get(homeController.renderFakePage);

module.exports = router;
