const Badge = require("../models/Badge");

const defaultBadges = [
  {
    name: "Primera partida",
    description: "Completaste tu primer quiz",
    iconUrl: "/badges/first.png",
    condition: "first_quiz",
  },
  {
    name: "Puntaje perfecto",
    description: "Respondiste todo correcto en un quiz",
    iconUrl: "/badges/perfect.png",
    condition: "perfect_score",
  },
  // NUEVAS INSIGNIAS
  {
    name: "Jugador activo",
    description: "Has completado 10 quizzes",
    iconUrl: "/badges/active_player.png",
    condition: "ten_quizzes",
  },
  {
    name: "Colaborador",
    description: "Enviaste tu primer feedback",
    iconUrl: "/badges/feedback.png",
    condition: "first_feedback",
  },
  {
    name: "Puntaje brillante",
    description: "Obtuviste 100% en un quiz",
    iconUrl: "/badges/brilliant_score.png",
    condition: "perfect_score", // puedes usar el mismo condition si aplica para ambas
  },
];

const preloadBadges = async () => {
  for (const badge of defaultBadges) {
    const exists = await Badge.findOne({ condition: badge.condition });
    if (!exists) {
      await Badge.create(badge);
      console.log(`✅ Badge creado: ${badge.name}`);
    } else {
      console.log(`ℹ️ Badge ya existe: ${badge.name}`);
    }
  }
};

module.exports = preloadBadges;
