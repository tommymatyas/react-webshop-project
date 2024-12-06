import { useState } from "react";

const Checkout = ({ cart = [], onClearCart, setIsCheckout, user }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: user?.email || "",
    address: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.address) {
      alert("Please fill out all the fields.");
      return;
    }

    console.log("Order placed:", {
      userDetails,
      cart,
      total: calculateTotal(),
    });

    onClearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout">
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your order, {userDetails.name}!</p>
        <button
          onClick={() => setIsCheckout(false)}
          className="back-to-cart-btn"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-details">
        <h2>Your Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userDetails.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={userDetails.email}
          onChange={handleInputChange}
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={userDetails.address}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="checkout-cart">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h3>Total: ${calculateTotal()}</h3>
      </div>

      <div className="checkout-actions">
        <button
          onClick={() => setIsCheckout(false)}
          className="back-to-cart-btn"
        >
          Back to Cart
        </button>
        <button onClick={handlePlaceOrder} className="place-order-btn">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
