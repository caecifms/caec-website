const app = require("./server");
const database = require("./database");

app.listen(process.env.PORT, async () => {
  await database.checkConnection();
  await database.sequelize.sync({ logging: false, force: false });
  console.log("Servidor iniciado!");
});
