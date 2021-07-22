'use strict';
const models = require("../models");

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
        title: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        fileUrl: {
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
    Document.associate = (models)=>{
        Document.belongsTo(models.User);
    } ;
    return Document;
}