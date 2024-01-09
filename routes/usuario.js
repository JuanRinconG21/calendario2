const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario");

router.post("/registrar", usuarioController.registrarUsuario);
router.get("/obtener/:id", usuarioController.obtenerUsuarioPorId);
router.post("/login", usuarioController.LoginUser);

module.exports = router;
