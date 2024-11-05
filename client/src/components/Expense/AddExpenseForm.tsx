import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils";
import { Expense } from "../../types/types";

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext);
  const [description, setDescription] = useState(''); 
  const [cost, setCost] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense: Expense = {
      id: (expenses.length + 1).toString(),
      description, 
      cost: parseInt(cost),
    };

    try {
      const savedExpense = await createExpense(newExpense); 
      setExpenses([...expenses, savedExpense]);
      setDescription('');
      setCost('');
    } catch (error) {
      console.error("Failed to create expense:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
