import { Router } from "express";
import { ExpenseController } from "../controllers"; // Adjust the path based on your project structure

export class ExpenseRoutes {
    private router: Router;
    private controller: ExpenseController; // Make sure to import the correct controller

    constructor() {
        this.controller = new ExpenseController(); // Make sure to use the correct controller class
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get("/page", (req, res) => this.controller.getPaged(req, res));
        
        // Get all Expenses
        this.router.get("/", (req, res) => this.controller.getAll(req, res));

        // Get Expense by ID
        this.router.get("/:id", (req, res) =>
            this.controller.getById(req, res)
        );

        // Create or update Expense
        this.router.post("/", (req, res) => this.controller.upsert(req, res));
        this.router.put("/:id", (req, res) => this.controller.upsert(req, res));

        // Delete Expense
        this.router.delete("/:id", (req, res) =>
            this.controller.delete(req, res)
        );
    }

    public getRouter() {
        return this.router;
    }
}
