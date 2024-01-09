const calendarioModelo = require("../Model/Calendario");
const { QueryTypes } = require("sequelize");
const sequelize = require("../Model/Conexion");

//LISTAR VALORES GASTOS
const ListarGastos = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = `SELECT SUM(valor) as total FROM calendario WHERE tipoEvento = 0 AND Usuario_idUsuario = ${userId}`;

    const result = await sequelize.query(query, { type: QueryTypes.SELECT });
    const totalGastos = result[0].total;

    res.send({ id: 200, mensaje: `${totalGastos}` });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

//LISTAR VALORES INVERSIONES
const ListarInversiones = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = `SELECT SUM(valor) as total FROM calendario WHERE tipoEvento = 1 AND Usuario_idUsuario = ${userId}`;

    const result = await sequelize.query(query, { type: QueryTypes.SELECT });
    const totalInversion = result[0].total;

    res.send({ id: 200, mensaje: `${totalInversion}` });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

//LISTAR CALENDARIO POR USUARIOS
const CalendarioUsuario = async (req, res) => {
  try {
    const calendarioUser = await calendarioModelo.findAll({
      where: { Usuario_idUsuario: req.params.id },
    });
    res.send({ id: 200, mensaje: calendarioUser });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

const agregarFechaCalendario = async (req, res) => {
  try {
    const {
      fechaCalendario,
      descripcion,
      valor,
      fechaModificacion,
      estado,
      tipoEvento,
      UsuarioidUsuario,
    } = req.body;

    console.log(UsuarioidUsuario);

    const nuevaFechaCalendario = await calendarioModelo.create({
      fechaCalendario,
      descripcion,
      valor,
      fechaModificacion,
      estado,
      tipoEvento,
      Usuario_idUsuario: UsuarioidUsuario,
    });
    if (nuevaFechaCalendario) {
      return res.status(200).json({
        mensaje: "fecha agregada exitosamente",
        status: true,
        producto: nuevaFechaCalendario,
      });
    } else {
      return res.status(404).json({
        mensaje: "Error al agregar la fecha",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al agregar la fecha",
      status: false,
      error: error.message,
    });
  }
};
// OBTENER TODAS LAS FECHAS
const obtenerFechasCalendario = async (req, res) => {
  try {
    const fechas = await calendarioModelo.findAll();

    if (!fechas) {
      return res.status(404).json({
        mensaje: "fechas no encontradas",
        status: false,
      });
    }

    return res.status(200).json({
      mensaje: "fechas obtenidas exitosamente",
      status: true,
      fechas: fechas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al obtener las fechas",
      status: false,
      error: error.message,
    });
  }
};

// OBTENER UNA FECHA POR ID
const obtenerFechaCalendarioPorId = async (req, res) => {
  try {
    const fecha = await calendarioModelo.findByPk(req.params.id, {});

    if (!fecha) {
      return res.status(404).json({
        mensaje: "Fecha no encontrada",
        status: false,
      });
    }

    return res.status(200).json({
      mensaje: "Fecha obtenida exitosamente",
      status: true,
      fecha: fecha,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al obtener la fecha",
      status: false,
      error: error.message,
    });
  }
};

// ACTUALIZAR UNA FECHA POR ID
const actualizarFechaCalendario = async (req, res) => {
  try {
    const fecha = await calendarioModelo.findByPk(req.params.id);

    if (!fecha) {
      return res.status(404).json({
        mensaje: "Fecha no encontrada",
        status: false,
      });
    }

    const {
      fechaCalendario,
      descripcion,
      valor,
      fechaModificacion,
      UsuarioIdUsuario,
    } = req.body;

    // Actualizar los campos del producto
    fecha.fechaCalendario = fechaCalendario;
    fecha.descripcion = descripcion;
    fecha.valor = valor;
    fecha.fechaModificacion = fechaModificacion;
    fecha.UsuarioIdUsuario = UsuarioIdUsuario;
    // Actualizar la imagen si se proporciona una nueva

    await fecha.save();

    res.status(200).json({
      mensaje: "Fecha actualizada exitosamente",
      status: true,
      fecha: fecha,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al actualizar la fecha",
      status: false,
      error: error.message,
    });
  }
};

// ELIMINAR UNA FECHA POR ID
const eliminarFechaCalendario = async (req, res) => {
  try {
    const fecha = await calendarioModelo.findByPk(req.params.id);

    if (!fecha) {
      return res.status(404).json({
        mensaje: "Fecha no encontrada",
        status: false,
      });
    }

    await fecha.destroy();

    return res.status(200).json({
      mensaje: "Fecha eliminada exitosamente",
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al eliminar la fecha",
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  agregarFechaCalendario,
  obtenerFechasCalendario,
  obtenerFechaCalendarioPorId,
  actualizarFechaCalendario,
  eliminarFechaCalendario,
  ListarGastos,
  ListarInversiones,
  CalendarioUsuario,
};
