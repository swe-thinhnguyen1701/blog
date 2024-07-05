const {Model, DataTypes} = require("sequelize");
require("dotenv").config();

const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        model: "post"
    }   
)