import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
    // Open the database connection
    const db = await open({
        filename: "database.sqlite",
        driver: sqlite3.Database,
    });

    // Drop the table if it exists to reset to an empty state
    await db.exec(`DROP TABLE IF EXISTS expenses;`);

    // Create the "expenses" table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS expenses (
            id TEXT PRIMARY KEY,
            description TEXT NOT NULL,
            cost INTEGER NOT NULL
        );
    `);

    // Insert initial data
    await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?)', ['1', 'Groceries', 50]);
    await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?)', ['2', 'Rent', 500]);
    await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?)', ['3', 'Utilities', 150]);

    return db;
};

export default initDB;
