const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const Comment = sequelize.define('Comment', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    PostId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Comment;