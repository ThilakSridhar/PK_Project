import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

export class Expense extends Model {}

Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expense_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2), // Adjust the precision and scale as needed
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Expense",
        timestamps: false,
        underscored: true,
    }
);

export default Expense;
