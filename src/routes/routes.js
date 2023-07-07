const routes = require("express").Router();
const path = require("path");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const renderController = require("../controllers/renderController");

routes.use(renderController.renderError);

module.exports = routes;