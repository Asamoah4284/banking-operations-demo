import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useState, useReducer } from "react";
const initialState = {
  balance: 0,
  loan: 0,
  disabled: true,
};
function reducer(state, action) {
  if (state.disabled && action.type !== "open") return state;
  switch (action.type) {
    case "open":
      return { ...state, isActive: true, balance: 500, disabled: false };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "request":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: action.payload,
      };
    case "pay":
      return { ...state, balance: state.balance - state.loan, loan: 0 };
    case "close":
      if (state.loan > 0 || state.balance !== 0) return state;
      return { ...initialState };
    default:
      throw new Error("Bad Action");
  }
}

export default function App() {
  const [{ balance, loan, disabled }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan:{loan} </p>

      <p>
        <button onClick={() => dispatch({ type: "open" })} disabled={!disabled}>
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={disabled}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={disabled}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "request", payload: 5000 })}
          disabled={disabled}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "pay" })} disabled={disabled}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "close" })} disabled={disabled}>
          Close account
        </button>
      </p>
    </div>
  );
}
