import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/fetchFunction";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const data = await fetchData("/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });

    
          if (data.token) {
            localStorage.setItem("token", data.token); // Store the token
            alert("Login successful!");
            navigate("/"); // Redirect to the home page or dashboard
          } else {
            alert(data.error || "Google login failed. Please try again.");
          }
        } catch (error) {
          console.error("Error fetching access token:", error);
          alert("An error occurred. Please try again.");
        }
      } else {
        alert("Authorization code not found. Please try logging in again.");
        navigate("/login"); // Redirect to login if no code is found
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return <div>Processing login...</div>;
};

export default Callback;