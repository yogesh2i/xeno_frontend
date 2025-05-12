import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CampaignHome from "./components/CampaignHome";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Callback from "./components/auth/Callback";
import "dotenv";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/callback" element={<Callback/>} />
        <Route path="/" element={
          <ProtectedRoute>
            <CampaignHome/>
          </ProtectedRoute>
          }/>
      </Routes>
    </Router>
  );
};

export default App;
