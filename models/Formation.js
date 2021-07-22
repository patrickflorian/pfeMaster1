
const models = require("../models");

module.exports = (sequelize, DataTypes) => {
    var Formation = sequelize.define('Formation', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fileUrl: {
            type: DataTypes.STRING,
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
    Formation.associate = (models)=>{
        Formation.belongsTo(models.User);
    } 
    return Formation;
}