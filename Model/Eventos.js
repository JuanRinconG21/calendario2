const { DataTypes } = require("sequelize");
const sequelize = require("./Conexion");
const Calendario = require("./Calendario");

const Eventos = sequelize.define(
  "Eventos",
  {
    idEventos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcionEvento: {
      type: DataTypes.STRING,
    },
    tipoEvento: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "eventos",
    timestamps: false,
  }
);

Eventos.belongsTo(Calendario, { foreignKey: "Calendario_idCalendario" });
Calendario.hasMany(Eventos, { foreignKey: "Calendario_idCalendario" });

module.exports = Eventos;
