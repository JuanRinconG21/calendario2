const eventoModelo = require("../Model/Eventos");

    // AGREGAR Evento
const agregarEvento = async (req, res) => {
  try {
    const { descripcion } = req.body;

    const nuevoEvento = await eventoModelo.create({ descripcion });

    if (nuevoEvento) {
      return res.status(200).json({
        mensaje: "Evento agregado exitosamente",
        status: true,
        evento: nuevoEvento,
      });
    } else {
      return res.status(500).json({
        mensaje: "Error al agregar el evento",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al agregar el evento",
      status: false,
      error: error.message,
    });
  }
};

// ELIMINAR Evento POR ID
const eliminarEventoPorId = async (req, res) => {
  try {
    const evento = await eventoModelo.findByPk(req.params.id);

    if (!evento) {
      return res.status(404).json({
        mensaje: "evento no encontrado",
        status: false,
      });
    }

    await evento.destroy();
    res.status(200).json({
      mensaje: "evento eliminado exitosamente",
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al eliminar el evento",
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  agregarEvento,
  eliminarEventoPorId,
};
