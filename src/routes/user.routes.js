const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/authorize.middleware");

// Solo admin puede ver todos los users
router.get("/", protect, authorize("admin"), userController.getAllUsers);

// Cualquier user autenticado puede ver un user por ID
router.get("/:id", protect, userController.getUserById);

// Cualquier user autenticado puede actualizar
router.put("/:id", protect, userController.updateUser);

// Cualquier user autenticado puede eliminar
router.delete("/:id", protect, userController.deleteUser);

module.exports = router;
