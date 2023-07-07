const { DataTypes } = require('sequelize');
const { sequelize } = require("../../database");
const users = require("./users");

const posts = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const replies = sequelize.define('replies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

posts.belongsTo(users, {
    constraints: true,
    foreignKey: "idUser"
});

posts.hasMany(replies, {
    constraints: true,
    foreignKey: "idPost"
})

replies.belongsTo(users, {
    constraints: true,
    foreignKey: "idUser"
});

module.exports = {
    posts, replies
};