const express = require("express");
const router = express.Router();
const badgeController = require("../controllers/badge.controller");
const { protect, adminOnly } = require("../middlewares/auth.middleware");

// Público para usuarios autenticados
router.get("/", protect, badgeController.getAllBadges);
router.get("/:id", protect, badgeController.getBadgeById);

// Solo administradores
router.post("/", protect, adminOnly, badgeController.createBadge);
router.put("/:id", protect, adminOnly, badgeController.updateBadge);
router.delete("/:id", protect, adminOnly, badgeController.deleteBadge);

module.exports = router;
