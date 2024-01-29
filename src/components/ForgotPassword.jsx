
import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
 
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer ] =useState("")
 
  const navigate = useNavigate();
 

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const res = await axios.post('http://localhost:4000/api/v1/forgot-password', {
        email,
        newPassword,
        answer
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        
        navigate( "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
  
      <div className="w-full h-screen flex justify-center  items-center py-8 mt-9" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
         
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your favorite sport "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          
          </div>
        
          <button type="submit" 
             onClick={() => {
              navigate("/login");
            }}
          className="btn btn-primary">
        Reset
          </button>
        </form>
      </div>
  
  );
};

export default ForgotPassword;