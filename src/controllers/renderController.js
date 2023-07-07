const express = require("express");
const path = require("path");

exports.renderError = (req, res) => {
    res.status(404);
    res.send("Not Found");
}