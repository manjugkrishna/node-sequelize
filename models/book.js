const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        static associate(model) {
            Book.belongsTo(model.User,{foreignKey:'userId'})
        }
    }
    Book.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            bookname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            bookPrice: {
                type: DataTypes.STRING,
                unique: false,
            },
            bookAuthor: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId:{
                type:DataTypes.UUID,
            }
            
        },
        {
            sequelize,
            modelName: Book.name,
            tableName: 'Book',
            timestamps: true,
        }
    );

    return Book;
};