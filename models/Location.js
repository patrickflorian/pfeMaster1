'use strict';

module.exports = (sequelize, DataTypes) => {
    var Location = sequelize.define('Location', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        classroom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
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
    uniqueKeys: {
      actions_unique: {
          fields: ['latitude', 'longitude']
      }}
});
    
    return Location;
}