import { useEffect, useState } from "react";
import Product from "./Product";

export default function Products() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [])

  const handleSort = (event) => {
    fetch(`https://fakestoreapi.com/products/category/${event.target.className}`)
      .then((res) => res.json())
      .then((data) => setData(data));

  }
  const handleAll = () => {
    fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => setData(data));

  }

  return (
    <>
    <button className="men's clothing" onClick={handleSort}>men's clothing</button>
    <button className="jewelery" onClick={handleSort}>jewelery</button>
    <button className="electronics" onClick={handleSort}>electronics</button>
    <button className="women's clothing" onClick={handleSort}>women's clothing</button>
    <button className="all" onClick={handleAll}>all</button>
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
