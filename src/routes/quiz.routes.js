const express = require("express");
const router = express.Router();
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
} = require("../controllers/quiz.controller");
const { protect } = require("../middlewares/auth.middleware");

// Obtener todos los quizzes (pública)
router.get("/", getAllQuizzes);

// Obtener un quiz por ID (pública)
router.get("/:id", getQuizById);

// Crear un nuevo quiz (protegida → solo usuario autenticado puede crear)
router.post("/", protect, createQuiz);

module.exports = router;
