const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 30]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 32]
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                isUserExist = await User.findOne({where: {userName: newUserData.userName}});
                if(isUserExist !== null) {
                    throw new Error("User with this username already exists");
                }

                newUserData.password = await bcrypt.hash(newUserData.password, 10);
            },
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        model: "user"
    }
)