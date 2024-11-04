import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { LoginPage } from './pages/loginPage/loginPage';
import AuthService from './services/auth/authService';
import {
  Button,
} from "@mui/material";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await AuthService.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  console.log(user);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Welcome
        </p>
        {user ? (
          <div>
            <p>Witaj, {user.email}</p>
            
          <Button onClick={handleLogout}>Wyloguj się</Button>
          </div>
        ) : (
          <LoginPage />
        )}
      </header>
    </div>
  );
}

export default App;
