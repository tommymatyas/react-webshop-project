import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
export default function Register({addUser}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const newUser = [
      
    ]

    // SZÜLŐELEMBE NEW USER KÜLDÉS


    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => navigate('/'))
          .catch(err => {
            console.log("code: ", err.code)
            console.log("message: ", err.message)
            if (err.code === "auth/email-already-in-use") setError("email is already in use")
          })
      }

      useEffect(() => {
        if (user) navigate('/')
      }, [user, navigate])

      return (
        <>
          <h2>sign up to view content</h2>
          <h3>{error.length > 0 && error}</h3>
          <form onSubmit={event => {
            event.preventDefault();
    
            handleRegister();
          }}>
            <input type="email" placeholder="email" value={email} onChange={event => setEmail(event.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={event => setPassword(event.target.value)} />
            <button>sign up</button>
          </form>
          <button onClick={() => navigate('/Login')}>Login</button>
        </>
      )
    }