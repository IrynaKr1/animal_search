'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate (models) {
      Pet.belongsTo(models.PetType, {
        foreignKey: {
          allowNull: false,
          name: 'petTypeId',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }
  Pet.init(
    {
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      owner: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: /^[A-ZÀ-Ž][a-zA-Zà-ž]+ [A-ZÀ-Ž][a-zA-Zà-ž]+$/,
        },
      },
      ownerContacts: {
        type: DataTypes.STRING(13),
        allowNull: false,
        validate: {
          is: /^\+\d{12}$/,
        },
      },
      descritpion: { type: DataTypes.STRING, allowNull: false },
      city: {
        type: DataTypes.ENUM('Kyiv', 'Dnipro', 'New York'),
        allowNull: false,
      },
      isFound: { type: DataTypes.BOOLEAN, defaultValue: false },
      lostDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isBefore: new Date().toISOString(),
        },
      },
      petImage: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Pet',
      underscored: true,
    }
  );
  return Pet;
};
