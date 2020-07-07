/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  const garage_sale = sequelize.define(
    "garage_sale",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1 - 50]
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1 - 250]
        }
      },

      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          len: [1 - 10]
        }
      },

      picture: {
        type: DataTypes.STRING,
        allownull: false,
        validate: {
          len: [1 - 700]
        }
      }
    },
    { timestamps: false }
  );

  garage_sale.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    garage_sale.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return garage_sale;
};
