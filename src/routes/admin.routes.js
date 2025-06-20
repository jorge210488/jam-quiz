const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { protect } = require("../middlewares/auth.middleware");

const { authorize } = require("../middlewares/authorize.middleware");

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  adminController.getDashboard
);

module.exports = router;
