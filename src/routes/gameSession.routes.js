const express = require("express");
const router = express.Router();
const gameSessionController = require("../controllers/gameSession.controller");
const { protect } = require("../middlewares/auth.middleware");

// Todas las rutas protegidas con token

// Crear una GameSession → token obligatorio
router.post("/", protect, gameSessionController.createGameSession);

// Agregar respuesta → token obligatorio
router.post("/:id/responses", protect, gameSessionController.addResponse);
cd;
// Ver una GameSession específica por ID → token obligatorio
router.get("/:id", protect, gameSessionController.getGameSessionById);

// 🆕 Ver historial de GameSessions por usuario → token obligatorio
router.get("/", protect, gameSessionController.getSessionsByUser);

// Obtener GameSessions por quizId → token obligatorio
router.get("/quiz/:quizId", protect, gameSessionController.getSessionsByQuiz);

// terminar la gameSession
router.put("/:id/finish", protect, gameSessionController.finishGameSession);

//Unirse usuarios
router.post("/:sessionId/join", gameSessionController.joinSession);

// Eliminar una GameSession por ID → token obligatorio
router.delete("/:id", protect, gameSessionController.deleteGameSession);

module.exports = router;
