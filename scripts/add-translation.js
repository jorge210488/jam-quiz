require("dotenv").config(); // Cargar variables del .env

const mongoose = require("mongoose");
const Question = require("../src/models/Question");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const q = await Question.findOne({ questionText: "¿Cuánto es 2 + 2?" });

    if (q) {
      q.translations.set("en", {
        questionText: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
      });

      await q.save();
      console.log("✅ Traducción en inglés guardada");
    } else {
      console.log("❌ Pregunta no encontrada");
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error al ejecutar el script:", err);
    process.exit(1);
  }
})();
