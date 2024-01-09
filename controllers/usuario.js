const usuarioModelo = require("../Model/Usuario");
const bcrypt = require("../node_modules/bcrypt");

const registrarUsuario = async (req, res) => {
  try {
    const { nombreUsuario, password, email, direccion, telefono, salario } =
      req.body;
    // Encriptar la contraseña usando bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10); // El segundo argumento es el "salting rounds"

    //CREO EL USUARIO EN LA BASE DE DATOS
    const usuarioRegistrado = await usuarioModelo.create({
      nombreUsuario,
      password: hashedPassword,
      email,
      direccion,
      telefono,
      salario,
    });

    if (usuarioRegistrado) {
      return res.status(201).json({
        status: true,
        message: "Usuario registrado exitosamente",
        usuario: usuarioRegistrado.toJSON(),
      });
    } else {
      return res
        .status(404)
        .json({ status: false, error: "Error al registrar el usuario" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor", status: false });
  }
};

// CONTROLLADOR OBTENER INFORMACIÓN DE UN USUARIO POR ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // VALIDACION SI EXISTE EL ID ES POSITIVO
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
      return res.status(400).json({
        status: false,
        error: "ID de usuario inválido",
      });
    }

    // BUSCA EL USUARIO SI EXSITE
    const usuario = await usuarioModelo.findByPk(id);

    // VEREFICA SI EXISTE
    if (!usuario) {
      return res.status(404).json({
        status: false,
        error: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      status: true,
      usuario: {
        idUsuario: usuario.idUsuario,
        nombreUsuario: usuario.nombreUsuario,
        direccion: usuario.direccion,
        telefono: usuario.telefono,
        salario: usuario.salario,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Error interno del servidor",
    });
  }
};

//CONTROLADOR DE LOGIN
const LoginUser = async (req, res) => {
  try {
    const datos = req.body;

    //VALIDAR LA PRESENCIA DE EMAIL Y CONTRASEÑA
    if (!datos.email || !datos.password) {
      return res.status(400).json({
        status: false,
        resultado: "error",
        mensaje: "Faltan datos por enviar del formulario",
      });
    }

    //BUSCAMOS EL USUARIO POR MEDIO DE EMAIL
    const consulta = await usuarioModelo.findOne({
      where: { email: datos.email },
    });

    if (!consulta) {
      return res.status(400).json({
        status: false,
        resultado: "error",
        mensaje: "Usuario no existe en la BD",
      });
    } else {
      //COMPARAR LA CONTRASEÑA ALMACENADA
      const pwdCoincide = await bcrypt.compare(
        datos.password,
        consulta.password
      );

      if (!pwdCoincide) {
        return res.status(400).json({
          status: false,
          resultado: "error",
          mensaje: "Contraseña incorrecta",
        });
      }

      return res.status(200).json({
        status: true,
        resultado: "Exitoso",
        mensaje: "Inicio de sesión exitoso",
        usuario: {
          id: consulta.idUsuario,
          email: consulta.email,
          nombre: consulta.nombreUsuario,
          password: consulta.password,
          direccion: consulta.direccion,
          telefono: consulta.telefono,
          salario: consulta.salario,
        },
        consulta,
      });
    }
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
      status: false,
    });
  }
};

module.exports = { registrarUsuario, obtenerUsuarioPorId, LoginUser };
