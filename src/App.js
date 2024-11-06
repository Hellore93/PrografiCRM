/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './App.css';
import React, { useEffect, useState } from "react";
import { LoginPage } from './pages/loginPage/loginPage';
import AuthService from './services/authService';
import { Box } from "@mui/material";
import { Home } from './pages/home/home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await AuthService.getUser();
        setUser(user);
      } catch (err) {
        console.log("User not logged in:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) return null;
    return user ? children : <Navigate to="/login" replace />;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Box sx={{ padding: 2 }}>
            <Routes>
              <Route
                path="/login"
                element={user ? <Navigate to="/PrografiCRM" replace /> : <LoginPage onLogin={() => setUser(true)} />}
              />
              <Route
                path="/PrografiCRM"
                element={<ProtectedRoute> <Home onLogout={handleLogout} /> </ProtectedRoute>}
              />
              <Route
                path="/"
                element={<Navigate to={user ? "/PrografiCRM" : "/login"} replace />} />
            </Routes>
          </Box>
        </header>
      </div>
    </Router>
  );
}

export default App;