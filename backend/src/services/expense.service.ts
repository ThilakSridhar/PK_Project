import { Expense } from "../models"; // Adjust the path based on your project structure
import { IRepository } from "./service"; // Make sure to import the correct path for IRepository

export class ExpenseService extends IRepository<Expense> {}
