import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState<number | string>("");

  useEffect(() => {
    const loadBudget = async () => {
      try {
        const fetchedBudget = await fetchBudget();
        setBudget(fetchedBudget); 
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };

    loadBudget();
  }, [setBudget]);

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget.toString());

    if (!isNaN(amount) && amount > 0) {
      try {
        await updateBudget(amount); 
        setBudget(amount); 
        setNewBudget("");
      } catch (error) {
        console.error("Error updating budget:", error);
        alert("Failed to update budget. Please try again.");
      }
    } else {
      alert("Please enter a valid budget amount.");
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex flex-column align-items-center">
      <div>Budget: ${budget !== null ? budget : "Loading..."}</div>
      <input
        type="number"
        value={newBudget}
        onChange={(e) => setNewBudget(e.target.value)}
        placeholder="Enter new budget"
        className="mt-2 mb-2"
      />
      <button onClick={handleUpdateBudget} className="btn btn-primary">
        Update Budget
      </button>
    </div>
  );
};

export default Budget;
