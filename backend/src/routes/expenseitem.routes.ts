import { Router } from "express";
import { ExpenseItemController } from "../controllers"; // Adjust the path based on your project structure

export class ExpenseItemRoutes {
    private router: Router;
    private controller: ExpenseItemController;

    constructor() {
        this.controller = new ExpenseItemController();
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get("/page", (req, res) => this.controller.getPaged(req, res));
        
        // Get all ExpenseItems
        this.router.get("/", (req, res) => this.controller.getAll(req, res));

        // Get ExpenseItem by ID
        this.router.get("/:id", (req, res) =>
            this.controller.getById(req, res)
        );

        // Create or update ExpenseItem
        this.router.post("/", (req, res) => this.controller.upsert(req, res));
        this.router.put("/:id", (req, res) => this.controller.upsert(req, res));

        // Delete ExpenseItem
        this.router.delete("/:id", (req, res) =>
            this.controller.delete(req, res)
        );
    }

    public getRouter() {
        return this.router;
    }
}
