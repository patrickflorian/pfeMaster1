'use strict'
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
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
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        is_manager: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        token:{
            type:DataTypes.STRING,
            defaultValue:DataTypes.UUIDV4,
            allowNull:true
        }
    })
    return User;
}