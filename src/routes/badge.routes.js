const express = require("express");
const router = express.Router();
const badgeController = require("../controllers/badge.controller");

router.get("/", badgeController.getAllBadges);

module.exports = router;
