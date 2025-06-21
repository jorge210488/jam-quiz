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
