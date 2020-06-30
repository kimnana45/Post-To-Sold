module.exports = function (sequelize, DataTypes) {
    var Posteditem = sequelize.define("Posteditem", {

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
    }, { timestamps: false });
    return Posteditem;
};