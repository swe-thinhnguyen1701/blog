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
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
        posterId: {
            type: DataTypes.INTEGER,
            references: {
                model: "poster",
                id: "key"
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