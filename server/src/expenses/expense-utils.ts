import { Database } from "sqlite";
import { Request, Response } from "express";

// Create a new expense in the server
export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body;
 
    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }
 
    try {
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
    res.status(201).send({ id, description, cost });
 
 
 }
 

// Delete an expense in the server
export async function deleteExpense(req: Request, res: Response, db: Database) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: "Missing expense ID" });
    }

    try {
        await db.run('DELETE FROM expenses WHERE id = ?;', [id]);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be deleted, + ${error}` });
    }

    res.status(200).send({ message: "Expense deleted successfully" });
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        const expenses = await db.all('SELECT * FROM expenses;');
        res.status(200).send(expenses);
    } catch (error) {
        return res.status(400).send({ error: `Could not retrieve expenses, + ${error}` });
    }
}