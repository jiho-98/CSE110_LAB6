import React, { useEffect, useState } from "react";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
    const [budget, setBudget] = useState<number | null>(null);
    const [newBudget, setNewBudget] = useState<number | string>(''); 

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
    }, []);

    const handleUpdateBudget = async () => {
        const amount = parseFloat(newBudget.toString()); // Convert input to number

        if (!isNaN(amount) && amount > 0) { // Check if amount is valid
            try {
                await updateBudget(amount); // Update budget
                setBudget(amount); // Update state
                setNewBudget(''); // Clear input field
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
            <div>Budget: ${budget !== null ? budget : 'Loading...'}</div>
            <input 
                type="number" 
                value={newBudget} 
                onChange={(e) => setNewBudget(e.target.value)} 
                placeholder="Enter new budget" 
                className="mt-2 mb-2"
            />
            <button onClick={handleUpdateBudget} className="btn btn-primary">Update Budget</button>
        </div>
    );
};

export default Budget;
