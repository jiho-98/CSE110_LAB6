import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Expense } from "../types/types";
import { fetchExpenses } from "../utils/expense-utils"; 

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

interface AppProviderProps {
  children: ReactNode; 
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: 1000,
  setBudget: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const expenseList = await fetchExpenses();
        setExpenses(expenseList);
      } catch (error) {
        console.error("Failed to load expenses:", error);
      } finally {
        setLoading(false); 
      }
    };

    loadExpenses();
  }, []);

  return (
    <AppContext.Provider
      value={{
        expenses,
        setExpenses,
        budget,
        setBudget,
      }}
    >
      {loading ? <p>Loading expenses...</p> : children}
    </AppContext.Provider>
  );
};
