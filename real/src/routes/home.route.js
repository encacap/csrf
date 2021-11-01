const express = require("express");

const homeController = require("../controllers/home.controller");

const router = express.Router();

router.route("/create").post(homeController.createTransactionUsingGet);
router.route("/").get(homeController.renderTransactionForm).post(homeController.createTransaction);

module.exports = router;
