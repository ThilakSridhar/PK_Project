import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";
import BankDetails from "./bank-details";

export class BankTransaction extends Model {
    [x: string]: any;
}

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
        bank_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: BankDetails,
                key: "id",
            },
        },
        withdraw_id: {
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
        credit: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "BankTransaction",
        timestamps: false,
        underscored: true,
    }
);

BankTransaction.belongsTo(BankDetails, {
	foreignKey: "bank_id",
    as: "bank",
	onDelete: "cascade",
});

BankDetails.hasMany(BankTransaction, {
	foreignKey: "bank_id",
	as: "bankTransaction",
	onDelete: "cascade",
});

export default BankTransaction;
