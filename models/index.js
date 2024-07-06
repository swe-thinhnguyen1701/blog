const Poster = require("./Poster");
const User = require("./User");
const Comment = require("./Comment");

User.hasMany(Poster, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

Comment.belongsTo(Poster, {
    foreignKey: "poster_id"
});

Poster.hasMany(Comment, {
    foreignKey: "poster_id",
    onDelete: "CASCADE"
});

Poster.hasOne(User, {
    foreignKey: "user_id"
});

module.exports = { Poster, Comment, User };