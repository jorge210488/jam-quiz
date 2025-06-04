const express = require("express");
const router = express.Router();

// Ruta básica temporal
router.get("/", (req, res) => {
  res.json({ msg: "Ruta de quizzes funcionando" });
});

module.exports = router;
