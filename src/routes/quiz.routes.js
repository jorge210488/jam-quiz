const express = require("express");
const router = express.Router();
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getActiveQuizzes,
} = require("../controllers/quiz.controller");
const { protect } = require("../middlewares/auth.middleware");

// Obtener todos los quizzes (pública)
router.get("/", getAllQuizzes);

// 🟢 Obtener quizzes activos (pública o protegida según quieras)
router.get("/active", getActiveQuizzes);

// Obtener un quiz por ID (pública)
router.get("/:id", getQuizById);

// Crear un nuevo quiz (protegida → solo usuario autenticado puede crear)
router.post("/", protect, createQuiz);

module.exports = router;
