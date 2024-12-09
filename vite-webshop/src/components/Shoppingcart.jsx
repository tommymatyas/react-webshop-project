const ShoppingCart = ({
  cart = [],
  onRemoveItem = () => {},
  onClearCart = () => {},
  onProceedToCheckout = () => {},
}) => {
  // Calculate the total price of items in the cart
  const calculateTotal = () =>
    cart
      .reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
      )
      .toFixed(2);

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>

      {/* Display a message if the cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some items to get started!</p>
      ) : (
        <div>
          {/* Table to display cart items */}
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ id, image, title, price = 0, quantity = 1 }) => (
                <tr key={id}>
                  <td>
                    <img
                      src={image}
                      alt={title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{title}</td>
                  <td>${price.toFixed(2)}</td>
                  <td>{quantity}</td>
                  <td>${(price * quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => onRemoveItem(id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Display the total and action buttons */}
          <div className="cart-summary">
            <h2>Total: ${calculateTotal()}</h2>
            <div className="cart-buttons">
              <button onClick={onClearCart} className="clear-cart-btn">
                Clear Cart
              </button>
              <button
                onClick={onProceedToCheckout}
                className="proceed-checkout-btn"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
