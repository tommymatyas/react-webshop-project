export default function Product({ id, title, price, category, description, image }) {
     return  (
        <div className="product">
            <div>
                <img src={image} width="200" height="200"/>
                <h2>{title}</h2>
                <h3>Price:{price}</h3>
                <h4>Description{description}</h4>
                <h4>Category: {category}</h4>

            </div>
            <button>Add to cart</button>
        </div>
     )
}