// IMPORTS HERE
import './App.css';
import './main.css';
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeMessage from './components/WelcomeMessage';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import MainPage from './components/MainPage.jsx';
import UsernameProvider from './components/UsernameProvider.js';
import WelcomeUser from './components/WelcomeUser.jsx';

function App() {
  return (
    <UsernameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeMessage />} />
        </Routes>

        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/" element={<MainPage />} />
        </Routes>

        <Routes>
          <Route path="/" element={<WelcomeUser />} />
        </Routes>
      </Router>
    </UsernameProvider>
  );
}

export default App;