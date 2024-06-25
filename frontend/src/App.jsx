import "./App.css";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Overview from "../pages/Overview"

import { Route, Routes, HashRouter } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

//Create context
export const AuthContext = createContext();
export const IncomeContext = createContext();
export const ExpenseContext = createContext();

function App() {
  //Declare state that will be accessible from other components
  const [loggedIn, setLoggedIn] = useState(false);
  const [incomeResponse, setIncomeResponse] = useState();
  const [expenseResponse, setExpenseResponse] = useState();

  const token = sessionStorage.getItem("jwt-token");

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn, incomeResponse, expenseResponse]);

  //Wrap App with provider and set values to state declared earlier
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <IncomeContext.Provider value={{ incomeResponse, setIncomeResponse }}>
        <ExpenseContext.Provider
          value={{ expenseResponse, setExpenseResponse }}
        >
          <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>


        </ExpenseContext.Provider>
      </IncomeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
