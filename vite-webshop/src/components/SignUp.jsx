import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react"
import { auth } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const handleSignup = () => {
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

        handleSignup();
      }}>
        <input type="email" placeholder="email" value={email} onChange={event => setEmail(event.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={event => setPassword(event.target.value)} />
        <button>sign up</button>
      </form>
      <button onClick={() => navigate('/signin')}>sign in</button>
    </>
  )
}