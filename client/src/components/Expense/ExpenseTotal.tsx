import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import React from 'react';

const ExpenseTotal = () => {
  const { expenses = [] } = useContext(AppContext); 

  const totalExpenses = expenses.reduce((total, item) => {
    return total + item.cost;
  }, 0);

  return (
    <div className="alert alert-primary">
      <span>Spent so far: ${totalExpenses}</span>
    </div>
  );
};

export default ExpenseTotal;
