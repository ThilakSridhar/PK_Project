import { Request, Response } from "express";
import { ExpenseItemService } from "../services"; // Assuming you have an ExpenseItemService
import { ExpenseItem } from "../models"; // Assuming you have an ExpenseItem model
import { getPagingData } from "../helpers"; // You may need to import this helper function
import { sequelize } from "../db"; // Assuming you are using Sequelize for the database
import { Op } from "sequelize"; // Sequelize operators for database queries

export class ExpenseItemController {
    private expenseItemService: ExpenseItemService;

    constructor() {
        this.expenseItemService = new ExpenseItemService(ExpenseItem);
    }

    options = {}; // You can add any options you need here

    getPaged(req: Request, res: Response) {
        const { page, size } = req.query;
        this.expenseItemService
            .getPaged(page, size, this.options)
            .then((expenseItems) =>
                res.status(200).json(getPagingData(expenseItems))
            );
    }

    getAll(req: Request, res: Response) {
        this.expenseItemService
            .getAll()
            .then((expenseItems) => res.status(200).json(expenseItems));
    }

    getById(req: Request, res: Response) {
        this.expenseItemService
            .get(req.params.id, this.options)
            .then((expenseItem) => {
                if (expenseItem) res.status(200).json(expenseItem);
                else
                    res.status(404).json({
                        message: `ExpenseItem id:${req.params.id} does not exist`,
                    });
            });
    }

    async upsert(req: Request, res: Response) {
        let { id, expense_item_name } = req.body;

        let expenseItemData: any = {
            expense_item_name,
        };
        if (id && id > 0) expenseItemData = { ...expenseItemData, id };

        try {
            // Creating or Updating expense item details
            const [createdExpenseItem, isExist] = await ExpenseItem.upsert(
                expenseItemData,
                {
                    returning: true,
                }
            );

            res.status(201).json(createdExpenseItem);
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    }

    delete(req: Request, res: Response) {
        this.expenseItemService.get(req.params.id).then((expenseItem) => {
            if (expenseItem) {
                this.expenseItemService
                    .delete(req.params.id)
                    .then(() => {
                        res.status(200).json();
                    })
                    .catch((err) => res.status(400).json(err));
            } else
                res.status(404).json({
                    message: `ExpenseItem id:${req.params.id} does not exist`,
                });
        });
    }
}
