import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

export class ExpenseItem extends Model {}

ExpenseItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        expense_item_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "ExpenseItem",
        timestamps: false,
        underscored: true,
    }
);

export default ExpenseItem;
