const express = require("express");
const router = express.Router();
const calendarioController = require("../controllers/calendario");

router.post("/agregar", calendarioController.agregarFechaCalendario);
router.get("/obtener", calendarioController.obtenerFechasCalendario);
router.get("/obtener/:id", calendarioController.obtenerFechaCalendarioPorId);
router.put("/actualizar/:id", calendarioController.actualizarFechaCalendario);
router.delete("/eliminar/:id", calendarioController.eliminarFechaCalendario);
router.get("/listarGastos/:id", calendarioController.ListarGastos);
router.get("/listarInversiones/:id", calendarioController.ListarInversiones);
router.get("/obtenerCalendario/:id", calendarioController.CalendarioUsuario);
module.exports = router;
