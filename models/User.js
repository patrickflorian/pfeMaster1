'use strict'

const { Model } = require("sequelize");

/** @var DataTypes DataType */
module.exports = (sequelize, DataTypes) => {
    const PROTECTED_ATTRIBUTES = ['password'];
    class User extends Model {
        toJSON() {
            // hide protected fields
            const attributes = { ...this.get() };
            // eslint-disable-next-line no-restricted-syntax
            for (const a of PROTECTED_ATTRIBUTES) {
                delete attributes[a];
            }
            return attributes;
        }
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        is_manager: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true
        }
    },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            modelName: 'User' // We need to choose the model name
        });

    return User;
}