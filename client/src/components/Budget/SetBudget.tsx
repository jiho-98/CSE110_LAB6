import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { updateBudget } from "../../utils/budget-utils"; 

const SetBudget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState<string>("");

  const handleBudgetChange = async () => {
    const budgetValue = Number(newBudget);
    if (!isNaN(budgetValue) && newBudget !== "") {
      try {
        await updateBudget(budgetValue); 
        setBudget(budgetValue); 
        setNewBudget(''); 
      } catch (error) {
        console.error("Failed to update budget:", error);
      }
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h3 className="mb-3">Current Budget: ${budget}</h3>
      <div className="input-group">
        <input
          type="number"
          className="form-control"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          placeholder="Enter your budget"
        />
        <button className="btn btn-primary" onClick={handleBudgetChange}>
          Update Budget
        </button>
      </div>
    </div>
  );
};

export default SetBudget;
