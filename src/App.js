import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { LoginPage } from './pages/loginPage/loginPage';
import AuthService from './services/auth/authService';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await AuthService.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Welcome
        </p>
        <LoginPage />
      </header>
    </div>
  );
}

export default App;
