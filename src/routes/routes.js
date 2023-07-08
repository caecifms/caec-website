const routes = require("express").Router();
const path = require("path");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const renderController = require("../controllers/renderController");

/*-----------------------------------------------------/
/                  BACKEND PUBLIC ROUTES               /
/-----------------------------------------------------*/
routes.post("/auth/login", userController.login);
routes.post("/auth/register", userController.register);

/*-----------------------------------------------------/
/                  BACKEND USER ROUTES                 /
/-----------------------------------------------------*/
routes.get("/isauth", userController.authenticated, (req, res) => {
  res.send({ response: "authenticated" });
});

routes.delete("/users/delete", userController.authenticated, userController.delete);
routes.put("/users/update", userController.authenticated, userController.update);

// routes.use(renderController.renderError);

module.exports = routes;
