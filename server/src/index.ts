import express, { Request, Response } from "express";
import cors from "cors";
import { createExpenseEndpoints } from "./expenses/expense-endpoints";
import { expenses as defaultExpenses, budget as defaultBudget } from "./constants"; 
import { createBudgetEndpoints } from "./budget/budget-endpoints"; 
import { Expense } from './types';

const app = express();
const port = 8080;

let expenses: Expense[] = [...defaultExpenses];
let budget = { ...defaultBudget };

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ "data": "Hello, TypeScript Express!" });
});

createExpenseEndpoints(app, expenses, budget);
createBudgetEndpoints(app);
