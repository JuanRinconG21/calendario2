const express = require("express");
const router = express.Router();
const eventosController = require("../controllers/eventos");

router.post("/agregar",eventosController.agregarEvento);
router.delete("/eliminar/:id",eventosController.eliminarEventoPorId);

module.exports = router;