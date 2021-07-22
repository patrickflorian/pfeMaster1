'use strict';

const models = require("../models");

module.exports = (sequelize, DataTypes) => {
    var Message = sequelize.define('Message', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        text:{
            type: DataTypes.STRING,
            allowNull: false,
        }
       
    },
    {
        /* uniqueKeys: {
            actions_unique: {
                fields: ['latitude', 'longitude']
            }
        } */
    });
    Message.associate = (models)=>{
        Message.belongsTo(models.User);
    } 
    return Message;
}