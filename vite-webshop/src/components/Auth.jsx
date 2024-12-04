import { useEffect, useState } from "react";
import { auth } from "../services/firebase.config";
import { createContext } from "react";

const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  console.log(user)

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => setUser(userAuth))
  }, [])

  if (user !== undefined) {
    return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
   )
  } else {
    return (
      <div>loading...</div>
    )
  }

}

export { AuthContext, AuthProvider }