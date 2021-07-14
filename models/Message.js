'use strict';

const User = require("./User");

module.exports = (sequelize, DataTypes) => {
    var Message = sequelize.define('Message', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
       
    },
    {
        /* uniqueKeys: {
            actions_unique: {
                fields: ['latitude', 'longitude']
            }
        } */
    });
    Message.hasOne(User);
    return Message;
}