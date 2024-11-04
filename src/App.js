import logo from './logo.svg';
import './App.css';
import { LoginPage } from './pages/loginPage/loginPage';

function App() {
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
