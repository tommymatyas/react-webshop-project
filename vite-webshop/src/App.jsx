import { useEffect, useState, useContext} from "react";
import "./App.css";
import Products from "./components/Products";
import { auth } from "./services/firebase.config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./components/Auth";

function App() {
 
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (user === null) navigate('/signin')
    }, [user, navigate])
  return (
    
    
    
    <div className="app">
            <h2>hello {user?.email}</h2>
             <Products
            />
           <button onClick={() => auth.signOut()}>sign out</button>
         </div>
  
  
);

}

export default App;
