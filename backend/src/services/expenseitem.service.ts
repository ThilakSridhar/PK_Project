import { ExpenseItem } from "../models"; // Adjust the path based on your project structure
import { IRepository } from "./service"; // Make sure to import the correct path for IRepository

export class ExpenseItemService extends IRepository<ExpenseItem> {}
