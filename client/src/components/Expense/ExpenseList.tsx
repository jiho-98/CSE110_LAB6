import React, { useContext, useEffect } from 'react';
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { fetchExpenses, deleteExpense } from "../../utils/expense-utils"; 

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(AppContext); 

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const expenseList = await fetchExpenses();
      setExpenses(expenseList);
    } catch (err: any) {
      console.error("Error loading expenses:", err.message);
    }
  };


  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id); 
      setExpenses(expenses.filter((expense) => expense.id !== id)); 
    } catch (err: any) {
      console.error("Failed to delete expense:", err.message);
    }
  };

  return (
    <ul className="list-group">
      {expenses.map((expense: Expense) => (
        <ExpenseItem
          key={expense.id}
          currentExpense={expense} 
          onDelete={() => handleDelete(expense.id)} 
        />
      ))}
    </ul>
  );
};

export default ExpenseList;
