require("dotenv").config();
const { verify } = require("jsonwebtoken");
const users = require("../models/users");
const { posts, replies } = require("../models/posts");
const userController = require("./userController");

exports.createNewPost = async (req, res) => {
    const { title, content } = req.body;
    if (title == undefined || content == undefined) {
        return (res.sendStatus(406));
    }
    try {
        const newPost = await posts.create({
            title,
            content,
            idUser: req.user.id
        });
        if (newPost) {
            return (res.sendStatus(200));
        }
        else {
            return (res.sendStatus(406));
        }
    } catch (error) {
        console.log(error);
        return (res.sendStatus(500));
    }
}

exports.latestPosts = async (req, res) => {
    try {
        const allposts = await posts.findAll();
        if (allposts) {
            return res.json(allposts)
        }
    }
    catch (error) {
        return (res.sendStatus(500));
    }
}

exports.newReply = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;
        const post = await posts.findOne({
            where: {
                id
            }
        })
        if (post) {
            const reply = replies.create({
                id,
                answer
            });
        }
    }
    catch (error) {
        return (res.sendStatus(500));
    }
}