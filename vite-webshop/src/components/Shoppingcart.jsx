import "./Shoppingcart.css";

const ShoppingCart = ({ cart = [], onRemoveItem = () => {}, onClearCart = () => {} }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toFixed(2);
  };

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some items to get started!</p>
      ) : (
        <div>
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
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <h2>Total: ${calculateTotal()}</h2>
            <button onClick={onClearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
