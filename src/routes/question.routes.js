const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuestionsByQuiz,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/question.controller");
const { protect } = require("../middlewares/auth.middleware");

// Crear una pregunta (protegida)
router.post("/", protect, createQuestion);

// Obtener todas las preguntas (protegida o pública según tu criterio)
router.get("/", getAllQuestions);

// Obtener preguntas de un quiz (pública)
router.get("/quiz/:quizId", getQuestionsByQuiz);

// Actualizar una pregunta (protegida)
router.put("/:id", protect, updateQuestion);

// Eliminar una pregunta (protegida)
router.delete("/:id", protect, deleteQuestion);

module.exports = router;
