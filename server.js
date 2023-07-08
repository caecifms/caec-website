require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const router = require("./src/routes/routes");
const app = express();

app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "ejs");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(router);

module.exports = app;
