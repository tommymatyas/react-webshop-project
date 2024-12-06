import { useEffect, useState, useContext} from "react";
import "./App.css";
import Products from "./components/Products";
import ShoppingCart from "./components/Shoppingcart";
import Checkout from "./components/Checkout";
import { auth } from "./services/firebase.config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./components/Auth";
import { db } from "./services/firebase.config";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function App() {
 
const user = useContext(AuthContext);
const navigate = useNavigate();
const [cart, setCart] = useState([]); 
const [showCart, setShowCart] = useState(false); 
const [isCheckout, setIsCheckout] = useState(false);
  
useEffect(() => {
  if (user === null) navigate('/signin')
  }, [user, navigate])

const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
        return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    };
  
    const removeFromCart = (productId) => {
      setCart((prevCart) =>
        prevCart.filter((item) => item.id !== productId)
      );
    };
  
const clearCart = () => {
      setCart([]);
  };
  
    return (
    <div className="app">
            <div className="header">
        <div className="header-left">
          <h2>Hello {user?.email}!</h2>
        </div>
        <div className="header-right">
          <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
            <ShoppingCartIcon fontSize="large" style={{ color: "#004e89" }} />
            <span
              className="cart-count"
              aria-label={`Cart has ${cart.length} items`}
            >
              {cart.length}
            </span>
          </div>
          <button className="header-menu" onClick={() => auth.signOut()}>
            Sign Out
          </button>
        </div>
      </div>

      
      {!isCheckout ? (
        <>
          <Products onAddToCart={addToCart} />
          {showCart && (
            <ShoppingCart
              cart={cart}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
            />
          )}
          {cart.length > 0 && (
            <button onClick={() => setIsCheckout(true)} className="checkout-btn">
              Proceed to Checkout
            </button>
          )}
        </>
      ) : (
          <Checkout
            cart={cart}
            onClearCart={clearCart}
            setIsCheckout={setIsCheckout}
            user={user}
          />
        )}
            </div>
          );
        }

export default App;