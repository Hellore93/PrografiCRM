import './App.css';
import React, { useEffect, useState } from "react";
import { LoginPage } from './pages/loginPage/loginPage';
import AuthService from './services/authService';
import { Box } from "@mui/material";
import { Home } from './pages/home/home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Products } from './pages/products/products';
import { Spinner } from './elements/spinner';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
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
    setLoading(true);
    await AuthService.logout();
    setUser(null);
    setLoading(false);
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) return null;
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="App">
        {loading && (
          <Spinner />
        )}
        <header className="App-header">
          <Box>
            <Routes>
              <Route
                path="/login"
                element={user ? <Navigate to="/PrografiCRM" replace /> : <LoginPage onLogin={() => setUser(true)} />}
              />
              <Route
                path="/PrografiCRM"
                element={<ProtectedRoute> <Home onLogout={handleLogout} /> </ProtectedRoute>}
              >
                <Route path="products" element={<Products />} />
              </Route>
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