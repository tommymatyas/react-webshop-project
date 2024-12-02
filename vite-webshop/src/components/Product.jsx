export default function Product({ id, title, price, category, description, image }) {
     return  (
        <div className="product">
            <div>
                <img src={image} width="200" height="200"/>
                <h2>{title}</h2>
                <h2>{price}</h2>
                <h2>{description}</h2>
                <h2>{title}</h2>

            
            
            
            
            
            
            </div>
            <button>Add to cart</button>
        </div>
     )
}