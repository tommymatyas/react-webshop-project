import { useEffect, useState } from "react";
import Product from "./Product";

export default function Products() {
  const [data, setData] = useState("");
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => setData(data));

  return (
    <>
      {data && data.map(product => <Product 
      key={product.id} 
      id={product.id} 
      title={product.title} 
      price={product.price} 
      category={product.category} 
      description={product.description} 
      image={product.image} />)}
    </>
  );
}
