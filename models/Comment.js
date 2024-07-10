const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
        poster_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "poster",
                key: "id"
            }
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        freezeTableName: true,
        modelName: "comment"
    }
)

module.exports = Comment;