const app = require("./server");
const { sequelize } = require("./database");

app.listen(process.env.PORT, async () => {
  try
  {
    await sequelize.authenticate();
    await sequelize.sync({ logging: false, force: false });
  }
  catch(error)
  {
    console.log(error);
  }
  console.log("Servidor iniciado!");
});
