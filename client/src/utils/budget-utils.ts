const API_BASE_URL = "http://localhost:8080";

interface BudgetResponse {
    data: {
        amount: number;
    };
}

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "GET",
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch budget.");
    }
    
    const data = await response.json();
    return data.data.amount;
};

export const updateBudget = async (newAmount: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: newAmount }),
    });

    if (!response.ok) {
        throw new Error("Failed to update budget.");
    }
};
