module.exports = function(sequelize, dataTypes){
    let alias = "Operation";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            "allowNull" : false
        },
        user_id: {
            type: dataTypes.INTEGER().UNSIGNED,
            "allowNull" : false
        },
        type : {
            type: dataTypes.BOOLEAN(),
            "allowNull" : false
        },
        amount : {
            type : dataTypes.INTEGER(),
            "allowNull" : false
        },
        concept : {
            type : dataTypes.STRING(250),
            "allowNull" : false
        },
        date : {
            type : dataTypes.DATE(),
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
        "tableName": "operation",
        "underscored" : true,
        "createdAt" : "created_at",
        "updatedAt" : "updated_at"
    }

    let Operation = sequelize.define(alias, cols, config); 


    Operation.associate = function(models){
        Operation.belongsTo(models.User, {
            as : "user",
            foreignKey:"user_id"
        })

    }

    return Operation;
    }