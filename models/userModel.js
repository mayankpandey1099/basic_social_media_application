const {DataTypes} = require('sequelize');

const sequelize = require("../database");

const Post = sequelize.define("Post", {
    link:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    comments:{
        type: DataTypes.JSON,
        defaultValue : [],
    },
  
});

module.exports = Post;