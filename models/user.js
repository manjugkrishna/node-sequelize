const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(model) {
            User.hasMany(model.Book,{foreignKey:'id'})
        }
    }
    User.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mobileNumber: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: User.name,
            tableName: 'Users',
            timestamps: true,
        }
    );

    return User;
};