const routes = require("express").Router();
const path = require("path");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const renderController = require("../controllers/renderController");

/*-----------------------------------------------------/
/                  BACKEND PUBLIC ROUTES               /
/-----------------------------------------------------*/
routes.post("/auth/sign-in", userController.signin);
routes.post("/auth/sign-up", userController.signup);
routes.get("/auth/sign-out", userController.signout);

/*-----------------------------------------------------/
/                  BACKEND USER ROUTES                 /
/-----------------------------------------------------*/
routes.delete("/users/delete", userController.authenticated, userController.delete);
routes.put("/users/update", userController.authenticated, userController.update);
routes.post("/newpost", userController.authenticated, postController.createNewPost);

/*-----------------------------------------------------/
/               BACKEND PROTECTED ROUTES               /
/-----------------------------------------------------*/
routes.put("/restrict/changeAdminPermissions", userController.authenticated, userController.protected, userController.changeAdminPermissions);

routes.use(renderController.renderError);

module.exports = routes;
