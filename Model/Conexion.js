const Sequelize = require("sequelize");

const sequelize = new Sequelize("railway", "root", "f4cbBHgCCGgbHC4A2FGDeEEFe5b6f-5-", {
  host: "roundhouse.proxy.rlwy.net",
  dialect: "mysql",
  port: '56570'
});

module.exports = sequelize;