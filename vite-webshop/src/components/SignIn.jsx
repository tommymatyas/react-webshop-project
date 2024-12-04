import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react"
import { auth } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

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