import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

export class BankTransaction extends Model {}

BankTransaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        // add this afterwards
        // date: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        // },
        accountType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bankname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        withdrawID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true, // Adjust as needed
        },
    },
    {
        sequelize,
        modelName: "bank_transaction",
        timestamps: false,
        underscored: true,
    }
);

export default BankTransaction;
