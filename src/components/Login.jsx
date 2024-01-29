
// import React, { useState } from "react";

// import axios from "axios";
// import { useNavigate , useLocation } from "react-router-dom";
// import {toast} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from "../context/auth";
// const Login = () => {
 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [auth, setAuth] =useAuth()
//   const navigate = useNavigate();
//   const location = useLocation();

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
        
//       const res = await axios.post('http://localhost:4000/api/v1/auth/login', {
//         email,
//         password,
//       });
//       if (res && res.data.success) {
//         toast.success(res.data && res.data.message);
//         setAuth({
//             ...auth,
//             user : res.data.user,
//             token : res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data))
//         navigate( location.state || "/home");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
   
//       <div className="w-full h-screen flex justify-center  items-center py-8 mt-9" style={{ minHeight: "90vh" }}>
//         <form onSubmit={handleSubmit}>
//           <h4 className="title">LOGIN FORM</h4>
         
//           <div className="mb-3">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Email "
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Enter Your Password"
//               required
//             />
          
//           </div>
          
//           <div className="mb-3">
            
//           <button type="button"
//            className="btn btn-primary"
//              onClick={() => {
//                 navigate("/forgot-password");
//               }}
//               >
//             Forgot Password
//           </button>
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Login
//           </button>
//         </form>
//       </div>
   
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during the request
    try {
      const res = await axios.post('http://localhost:5000/api/v1/login', {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center py-8 mt-9" style={{ minHeight: "90vh" }}>
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password
          </button>

        </div>
       
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default Login;
