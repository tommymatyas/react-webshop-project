import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import "./Login.css"

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = () => {
        fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
              username: email, 
              password: password,
            }),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error("Login failed");
              }
              return res.json();
            })
            .then((data) => {
              console.log(data);

              if (data) {
                navigate("/"); 
              }
            })
            .catch((err) => console.error("Error during login:", err));
        };

    

    return (
        <>
          <h2>sign in to view content</h2>
          <form onSubmit={event => {
            event.preventDefault();
    
            handleLogin();
          }}>
            <input type="text" placeholder="text" value={email} onChange={event => setEmail(event.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={event => setPassword(event.target.value)} />
            <button>Login</button>
          </form>
          <button onClick={() => navigate('/register')}>Register</button>
        </>
      )
}