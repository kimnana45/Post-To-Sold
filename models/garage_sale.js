//define garare_sale table
module.exports = function (sequelize, DataTypes) {
  const Garage_sale = sequelize.define(
    "Garage_sale",
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
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
        allownull: false,
        validate: {
          len: [1 - 700]
        }
      },
        sold: {
          type: DataTypes.BOOLEAN, 
          defaultValue: false
        }
    },
    { timestamps: false }
  );
  Garage_sale.associate = function (models) {
    Garage_sale.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  // Garage_sale.sync({force: true});
  return Garage_sale;
};
