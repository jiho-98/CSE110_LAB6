import { Request, Response } from 'express';

let budget = { amount: 1000 };

export function getBudget(res: Response) {
    res.status(200).send({ "data": budget });
}

export function updateBudget(req: Request, res: Response) {
    console.log("Received PUT request with body:", req.body);
    const { amount } = req.body;
    
    if (amount === undefined || typeof amount !== 'number') {
        return res.status(400).send({ error: "Please provide a valid budget amount." });
    }
    
    budget.amount = amount;
    console.log(`Budget updated to: ${budget.amount}`); 
    res.status(200).send({ message: "Budget updated successfully.", budget });
}
