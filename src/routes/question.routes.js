const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestionsByQuiz,
} = require("../controllers/question.controller");
const { protect } = require("../middlewares/auth.middleware");

// Crear una pregunta (protegida → solo usuario autenticado puede crear)
router.post("/", protect, createQuestion);

// Obtener preguntas de un quiz (pública)
router.get("/quiz/:quizId", getQuestionsByQuiz);

module.exports = router;
