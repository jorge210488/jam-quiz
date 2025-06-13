const express = require("express");
const router = express.Router();
const questionFeedbackController = require("../controllers/questionFeedback.controller");
const { protect, adminOnly } = require("../middlewares/auth.middleware");

// Crear feedback (cualquier user)
router.post("/", protect, questionFeedbackController.createFeedback);

// Obtener feedbacks (solo admin)
router.get(
  "/admin",
  protect,
  adminOnly,
  questionFeedbackController.getAllFeedbacks
);

module.exports = router;
