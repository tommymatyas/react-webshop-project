import { useState } from "react";
import "./App.css";
import Products from "./components/Products";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [users, setUsers] = useState ("")
  const addUser = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser])
  }

  fetch('https://fakestoreapi.com/users')
            .then(res =>res.json())
            .then(users => setUsers(users))
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/about" element={<h2>about</h2>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register addUser={addUser}/>} />
      </Routes>
    </Router>
          

            
  
  
          );
}

export default App;
