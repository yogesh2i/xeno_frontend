import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const token = localStorage.getItem("token"); // Get the token from localStorage

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false); // No token, user is not authenticated
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        });

        if (response.ok) {
          setIsAuthenticated(true); // Token is valid
        } else {
          // Token is invalid or expired
          localStorage.removeItem("token"); // Clear the token
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token"); // Clear the token on error
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [token]);
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children; 
};

export default ProtectedRoute;