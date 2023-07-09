require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const users = require("../models/users");
const posts = require("../models/posts");
const { Op } = require("sequelize");
const { verify, sign } = require("jsonwebtoken");

exports.authenticated = async (req, res, next) => {
  const { caectoken } = req.cookies;
  if (caectoken == undefined) {
    return res.sendStatus(401);
  }
  try {
    const data = verify(caectoken, process.env.KEY);
    const user = await users.findOne({
        where: { id: data.id }
      })
      if(!!user)
      {
        req.user = user;
        next();
      }
      else
      {
        return res.sendStatus(401);
      }
  } catch (error) {
    return res.sendStatus(401);
  }
};

exports.signup = async (req, res) => {
  const { name, surname, email, ra, password } = req.body;
  if (
    name == undefined ||
    surname == undefined ||
    email == undefined ||
    ra == undefined ||
    password == undefined
  ) {
    return res.sendStatus(400);
  }
  try {
    const data = await users.findOne({
      where: { [Op.or]: { email, ra } },
    })
    if (!!!data) {
      const hash = await bcrypt.hash(password, await bcrypt.genSalt(12));
      if (hash) {
        try {
          var newUser = await users.create({
            name,
            surname,
            email,
            ra,
            password: hash,
            isStudent: false,
            admin: false,
          });
          if (!!newUser) {
            return res.sendStatus(200);
          }
        } catch (error) {
          return res.sendStatus(500);
        }
      } else {
        res.sendStatus(500);
      }
    } else {
      return res.sendStatus(406);
    }
  }
  catch (error) {
    console.log(error);
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (email == undefined || password == undefined) {
    return res.sendStatus(400);
  }
  try {
    const user = await users.findOne({
      where: { email },
    });
    if (user) {
      const unhashed = await bcrypt.compare(password, user.password);
      if (unhashed) {
        const token = sign(
          { id: user.id, admin: user.admin },
          process.env.KEY,
          { expiresIn: "4h" }
        );
        res.cookie("caectoken", token, { httpOnly: true, secure: false });
        return res.status(200).json({
          status: "Success",
          message: "Authentication successful",
          token,
          name: user.name,
        });
      }
    }
    return res.sendStatus(401);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.signout = (req, res) => {
  const { caectoken } = req.cookies;
  if (caectoken) {
    res.clearCookie('caectoken');
    return (res.sendStatus(200));
  }
  else {
    return (res.sendStatus(406));
  }
}

exports.delete = async (req, res) => {
  try {
    const user = await users.destroy({
      where: { id: req.user.id }
    })
    if (user > 0) {
      res.clearCookie('caectoken');
      return (res.sendStatus(202));
    }
    return (res.sendStatus(406));
  } catch (error) {
    return (res.sendStatus(500));
  }
}

exports.update = async (req, res) => {
  const { change } = req.body;
  if (!!change) {
    if (!(change.name || change.surname || change.email || change.password)) {
      return res.sendStatus(406);
    }
    try {
      const user = await users.findOne({
        where: { id: req.user.id },
      });
      if (change.password) {
        if (
          await bcrypt.compare(change.password, user.getDataValue("password"))
        ) {
          return res.sendStatus(406);
        }
        change.password = await bcrypt.hash(
          change.password,
          await bcrypt.genSalt(12)
        );
      }
      if (change.name == user.getDataValue("name")) {
        return res.sendStatus(406);
      }
      if (change.surname == user.getDataValue("surname")) {
        return res.sendStatus(406);
      }
      if (change.email == user.getDataValue("email")) {
        return res.sendStatus(406);
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    try {
      const user = await users.update(change, {
        where: { id: req.user.id },
      });
      if (user) {
        return res.sendStatus(202);
      } else {
        return res.sendStatus(406);
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
};
