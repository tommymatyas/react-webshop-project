import React, { useState } from "react";
import "./Login.css"

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
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

              if (data.token) {
                localStorage.setItem("authToken", data.token);
                navigate("/"); 
              }
            })
            .catch((err) => console.error("Error during login:", err));
        };

    }

    return (
        <>
          <h2>sign in to view content</h2>
          <form onSubmit={event => {
            event.preventDefault();
    
            handleSignIn();
          }}>
            <input type="email" placeholder="email" value={email} onChange={event => setEmail(event.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={event => setPassword(event.target.value)} />
            <button>sign in</button>
          </form>
          <button onClick={() => navigate('/signup')}>sign up</button>
        </>
      )
    }