require("dotenv").config()
const express = require("express");
const bcrypt = require("bcrypt");
const users = require("../models/users");
const posts = require("../models/posts");
const { Op } = require("sequelize");
const { verify, sign } = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    if (email == undefined || password == undefined) {
        return (res.sendStatus(400));
    }
    try {
        const user = await users.findOne({
            where: { email }
        })
        if (!user) {
            return (res.sendStatus(401));
        }
        const unhashed = await bcrypt.compare(password, user.password);
        if (unhashed) {
            const token = sign({ id: user.id, admin: user.admin }, process.env.KEY, { expiresIn: "4h" });
            res.cookie("caectoken", token, { httpOnly: true, secure: false });
            return (res.status(202).json({
                status: "Success",
                message: "Authentication successful",
                token,
                name: user.name
            }));
        }
        return (res.sendStatus(401));
    } catch (error) {
        console.log(error)
        return (res.sendStatus(500));
    }
}

exports.register = async (req, res) => {
    const { name, surname, email, ra, password } = req.body;
    if (name == undefined || surname == undefined || email == undefined || ra == undefined || password == undefined) {
        return (res.sendStatus(400));
    }
    if ((await verifyIfUserExist(email, ra)) == null) {
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
                    admin: false
                });
                return (res.json(newUser));
            } catch (error) {
                return (res.sendStatus(500));
            }
        }
        else {
            res.sendStatus(500);
        }
    }
    else {
        return (res.sendStatus(406));
    }
}