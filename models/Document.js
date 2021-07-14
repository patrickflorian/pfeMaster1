'use strict';

const User = require("./User");

module.exports = (sequelize, DataTypes) => {
    var Document = sequelize.define('Document', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        /* uniqueKeys: {
            actions_unique: {
                fields: ['latitude', 'longitude']
            }
        } */
    });
    Document.hasOne(User);
    return Document;
}