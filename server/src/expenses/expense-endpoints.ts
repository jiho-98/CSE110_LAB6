import { Express, Request, Response } from "express";
import { Expense } from "../types";
import { createExpenseServer, deleteExpense, getExpenses } from "./expense-utils"; 

export function createExpenseEndpoints(app: Express, expenses: Expense[], budget: { amount: number }) {
  // Create a new expense
  app.post("/expenses", (req: Request, res: Response) => {
    createExpenseServer(req, res, expenses);
  });

  // Delete an expense
  app.delete("/expenses/:id", (req: Request, res: Response) => {
    deleteExpense(req, res, expenses);
  });

  // Get all expenses
  app.get("/expenses", (req: Request, res: Response) => {
    getExpenses(req, res, expenses);
  });

  // Get budget
  app.get("/budget", (req: Request, res: Response) => {
    res.status(200).send(budget);
  });
}
