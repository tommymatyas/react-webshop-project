export default function Product({ id, title, price, category, description, image, onAddToCart }) {
    const handleAddToCart = () => {
      const product = { id, title, price, category, description, image, quantity: 1 };
      onAddToCart(product);
    };

     return  (
        <div className="product">
            <div>
                <img src={image} width="200" height="200"/>
                <h2>{title}</h2>
                <h3>Price: ${price}</h3>
                <h4>Description{description}</h4>
                <h4>Category: {category}</h4>

            </div>
            <button onClick={handleAddToCart}>Add to cart</button>
        </div>
     )
}