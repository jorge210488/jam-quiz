const express = require("express");
const router = express.Router();
const gameSessionController = require("../controllers/gameSession.controller");
const { protect } = require("../middlewares/auth.middleware");

// Todas las rutas protegidas con token

// Crear una GameSession → token obligatorio
router.post("/", protect, gameSessionController.createGameSession);

// Agregar respuesta → token obligatorio
router.post("/:id/responses", protect, gameSessionController.addResponse);

// Ver una GameSession → token obligatorio
router.get("/:id", protect, gameSessionController.getGameSessionById);

module.exports = router;
