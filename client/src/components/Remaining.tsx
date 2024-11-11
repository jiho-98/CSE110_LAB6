import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses = [], budget = 0 } = useContext(AppContext);  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (expenses.length > 0) {
      setIsLoading(false);
    }
  }, [expenses]);

  const totalExpenses = expenses.reduce((total, item) => {
    return total + item.cost;
  }, 0);

  const remainingBalance = budget - totalExpenses;
  const alertType = remainingBalance < 0 ? "alert-danger" : "alert-success";

  // Create an alert when the remaining balance is less than 0.
  useEffect(() => {
    if (remainingBalance < 0) {
      alert("You have exceeded your budget!");
    }
  }, [remainingBalance]);

  if (isLoading) {
    return <div>Loading expenses...</div>;
  }

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${remainingBalance}</span>
    </div>
  );
};

export default Remaining;
