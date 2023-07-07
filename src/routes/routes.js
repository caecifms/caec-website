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

routes.use(renderController.renderError);

module.exports = routes;