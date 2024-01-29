
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';


const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]); 
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState("");

  // Get auth token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  // Set auth token in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("authToken", authToken);
  }, [authToken]);

  // Axios instance with default headers for auth token
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  

  const addIncome = async (income) => {
    try {
      await axiosInstance.post("add-income", income);
      getIncomes();
    } catch (error) {
      setError(error.response?.data?.message ||  "An error occurred");
      
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axiosInstance.get("get-incomes");
      setIncomes(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(`delete-income/${id}`);
      getIncomes();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };
  const updateIncome = async (id, updatedIncomeData) => {
    try {
      const response = await axiosInstance.put(`update-income/${id}`, updatedIncomeData);
  
      
      const updatedIncome = response.data.updatedIncome;
  
      setIncomes((prevIncomes) =>
        prevIncomes.map((income) => (income._id === updatedIncome._id ? updatedIncome : income))
      );
  
      return updatedIncome;
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      throw error;
    }
  };

  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  const addExpense = async (expense) => {
    try {
      await axiosInstance.post("add-expense", expense);
      getExpenses();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axiosInstance.get("get-expenses");
      setExpenses(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`delete-expense/${id}`);
      getExpenses();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const totalExpense = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  
  const updateExpense = async (id, updatedExpenseData) => {
    try {
      const response = await axiosInstance.put(`update-expense/${id}`, updatedExpenseData);
  
      const updatedExpense = response.data.updatedExpense;
  
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) => (expense._id === updatedExpense._id ? updatedExpense : expense))
      );
  
      return updatedExpense;
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      throw error;
    }
  };
  

  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };

  const addBudget = async (budget) => {
    try {
      await axiosInstance.post("add-budget", budget);
      getBudgets();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const getBudgets = async () => {
    try {
      const response = await axiosInstance.get("get-budgets");
      setBudgets(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const deleteBudget = async (id) => {
    try {
      await axiosInstance.delete(`delete-budget/${id}`);
      getBudgets();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const totalBudget = () => {
    return budgets.reduce((total, budget) => total + budget.amount, 0);
  };

  const updateBudget = async (id, updatedBudgetData) => {
    try {
      const response = await axiosInstance.put(`update-budget/${id}`, updatedBudgetData);
  
      
      const updatedBudget = response.data.updatedBudget;
  
      setBudgets((prevBudgets) =>
        prevBudgets.map((budget) => (budget._id === updatedBudget._id ? updatedBudget : budget))
      );
  
      return updatedBudget;
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      throw error;
    }
  };
  

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 5);
  };

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        budgets,
        addIncome,
        getIncomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpense,
        totalBalance,
        addBudget,
        getBudgets,
        deleteBudget,
        totalBudget,
        updateBudget,
        updateExpense,
        updateIncome,
        transactionHistory,
        error,
        setError,
        setAuthToken
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
