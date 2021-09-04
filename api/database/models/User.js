module.exports = function(sequelize, dataTypes){
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
        },
        email: {
            type : dataTypes.STRING(50),
            "allowNull" : false
        },
        password : {
            type : dataTypes.CHAR(60),
            "allowNull" : false
        },
        
        created_at: {
            type: dataTypes.DATE(),
            "allowNull" : false
        },
        updated_at: {
            type: dataTypes.DATE(),
            "allowNull" : false
        }
    }

    let config = {
        "tableName": "user",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
    }

    let User = sequelize.define(alias, cols, config);


    User.associate = function(models){
        User.hasMany(models.Operation, {
            as : "operations",
            foreignKey:"user_id"
        })
    }

    return User;
    }