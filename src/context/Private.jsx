import { useState, useEffect } from "react";
import { useAuth } from "./auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/user-auth');

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setOk(false);
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
      setLoading(false);
    }
  }, [auth?.token]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    // Handle error state (e.g., display an error message)
    return <div>Error: {error}</div>;
  }

  return ok ? <Outlet /> : <Spinner />;
}
