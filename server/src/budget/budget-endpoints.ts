import { getBudget, updateBudget } from "./budget-utils";
import { Request, Response } from 'express';

export function createBudgetEndpoints(app: any) {
    // Get the budget
    app.get("/budget", (req: Request, res: Response) => {
        getBudget(res);
    });

    // Update the budget
    app.put("/budget", (req: Request, res: Response) => {
        updateBudget(req, res); 
    });
}
