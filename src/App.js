import styled from "styled-components";
import { MainLayout } from "./styles/Layout";
import Navigation from "./components/navigation/Navigation";
import React ,{ useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./context/Private";

import { Routes , Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {

 
 
  return (
    <AppStyled className="App">
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/home" element={<PrivateRoute/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/register" element={<Register/>} />
      
      </Routes>
      
     
    </AppStyled>
  );
}

const AppStyled =styled.div`


`

export default App;
