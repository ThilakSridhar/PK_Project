import { Request, Response } from "express";
import { BankTransactionService } from "../services"; // Assuming you have a BankTransactionService
import { BankTransaction } from "../models"; // Assuming you have a BankTransaction model
import { getPagingData } from "../helpers";
import { sequelize } from "../db";
import { Op } from "sequelize";

export class BankTransactionController {
    private bankTransactionService: BankTransactionService;

    constructor() {
        this.bankTransactionService = new BankTransactionService(BankTransaction);
    }

    options = {}; // You can add any options you need here

    getPaged(req: Request, res: Response) {
        const { page, size } = req.query;
        this.bankTransactionService
            .getPaged(page, size, this.options)
            .then((bankTransactions) =>
                res.status(200).json(getPagingData(bankTransactions))
            );
    }

    getAll(req: Request, res: Response) {
        this.bankTransactionService
            .getAll()
            .then((bankTransactions) => res.status(200).json(bankTransactions));
    }

    getById(req: Request, res: Response) {
        this.bankTransactionService
            .get(req.params.id, this.options)
            .then((bankTransaction) => {
                if (bankTransaction) res.status(200).json(bankTransaction);
                else
                    res.status(404).json({
                        message: `BankTransaction id:${req.params.id} does not exist`,
                    });
            });
    }

    async upsert(req: Request, res: Response) {
        let { id, date, accountType, bankName, withdrawID, amount, description } = req.body;

        let bankTransaction: any = {
            date,
            accountType,
            bankName,
            withdrawID,
            amount,
            description,
        };
        if (id) bankTransaction = { ...bankTransaction, id };

        const t = await sequelize.transaction();

        try {
            // Creating or Updating bank transaction
            const [createdBankTransaction, isExist] = await BankTransaction.upsert(
                bankTransaction,
                {
                    transaction: t,
                    returning: true,
                }
            );

            t.commit();
            res.status(201).json(createdBankTransaction);
        } catch (err) {
            t.rollback();
            res.status(400).json(err);
            console.log(err);
        }
    }

    delete(req: Request, res: Response) {
        this.bankTransactionService.get(req.params.id).then((bankTransaction) => {
            if (bankTransaction) {
                this.bankTransactionService
                    .delete(req.params.id)
                    .then(() => res.status(200).json())
                    .catch((err) => res.status(400).json(err));
            } else
                res.status(404).json({
                    message: `BankTransaction id:${req.params.id} does not exist`,
                });
        });
    }
}
