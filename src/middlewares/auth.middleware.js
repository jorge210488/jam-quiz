const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const User = require("../models/User"); // Asegúrate de importar el modelo
    const user = await User.findById(decoded.id); // 👈 Aquí ahora sí se puede usar await

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // req.user._id estará disponible correctamente
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Acceso solo para administradores" });
  }
};
