import { Request, Response } from "express";
import { ExpenseService } from "../services"; // Assuming you have an ExpenseService
import { Expense } from "../models"; // Assuming you have an Expense model
import { getPagingData } from "../helpers"; // You may need to import this helper function
import { sequelize } from "../db"; // Assuming you are using Sequelize for the database
import { Op } from "sequelize"; // Sequelize operators for database queries


export class ExpenseController {
    private expenseService: ExpenseService;

    constructor() {
        this.expenseService = new ExpenseService(Expense);
    }

    options = {}; // You can add any options you need here

    getPaged(req: Request, res: Response) {
        const { page, size } = req.query;
        this.expenseService
            .getPaged(page, size, this.options)
            .then((expenses) =>
                res.status(200).json(getPagingData(expenses))
            );
    }

    getAll(req: Request, res: Response) {
        this.expenseService
            .getAll()
            .then((expenses) => res.status(200).json(expenses));
    }

    getById(req: Request, res: Response) {
        this.expenseService
            .get(req.params.id, this.options)
            .then((expense) => {
                if (expense) res.status(200).json(expense);
                else
                    res.status(404).json({
                        message: `Expense id:${req.params.id} does not exist`,
                    });
            });
    }

    async upsert(req: Request, res: Response) {
        let { id, date, expense_type, payment_type, amount } = req.body;

        let expenseData: any = {
            date,
            expense_type,
            payment_type,
            amount,
        };
        if (id && id > 0) expenseData = { ...expenseData, id };

        try {
            // Creating or Updating expense details
            const [createdExpense, isExist] = await Expense.upsert(expenseData, {
                returning: true,
            });

            res.status(201).json(createdExpense);
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    }

    delete(req: Request, res: Response) {
        this.expenseService.get(req.params.id).then((expense) => {
            if (expense) {
                this.expenseService
                    .delete(req.params.id)
                    .then(() => {
                        res.status(200).json();
                    })
                    .catch((err) => res.status(400).json(err));
            } else
                res.status(404).json({
                    message: `Expense id:${req.params.id} does not exist`,
                });
        });
    }
}
