import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

interface ExpenseItemProps {
  currentExpense: Expense;
  onDelete: () => void; // onDelete prop 추가
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ currentExpense, onDelete }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={onDelete} className="btn btn-danger btn-sm">x</button> {/* 삭제 버튼 */}
      </div>
    </li>
  );
};

export default ExpenseItem;