import { useState } from "react";

const Checkout = ({
  cart = [],
  onClearCart = () => {},
  setIsCheckout = () => {},
  user,
}) => {
  // State for user details and order placement status
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: user?.email || "",
    address: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate the total price of items in the cart
  const calculateTotal = () =>
    cart
      .reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
      )
      .toFixed(2);

  // Handle input changes for user details
  const handleInputChange = ({ target: { name, value } }) => {
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    const { name, email, address } = userDetails;

    if (!name || !email || !address) {
      alert("Please fill out all the fields.");
      return;
    }

    // Log the order details (this would be replaced with an API call in a real-world app)
    console.log("Order placed:", {
      userDetails,
      cart,
      total: calculateTotal(),
    });

    onClearCart();
    setOrderPlaced(true);
  };

  // Render order success message
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

  // Render checkout form and cart summary
  return (
    <div className="checkout">
      <h1>Checkout</h1>

      {/* User details form */}
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

      {/* Cart summary */}
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
              {cart.map(({ id, title, price = 0, quantity = 1 }) => (
                <tr key={id}>
                  <td>{title}</td>
                  <td>${price.toFixed(2)}</td>
                  <td>{quantity}</td>
                  <td>${(price * quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h3>Total: ${calculateTotal()}</h3>
      </div>

      {/* Checkout actions */}
      <div className="checkout-actions">
        <button
          onClick={() => setIsCheckout(false)}
          className="back-to-cart-btn"
        >
          Back to Home Page
        </button>
        <button onClick={handlePlaceOrder} className="place-order-btn">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
