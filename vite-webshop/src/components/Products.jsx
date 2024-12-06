import { useEffect, useState, useCallback, useMemo } from "react";
import Product from "./Product";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase.config";

export default function Products({ onAddToCart }) {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  const collectionRef = useMemo(() => collection(db, "products"), []);
  const getProducts = useCallback(
    () =>
      getDocs(collectionRef).then((snapshot) => {
        const products = snapshot.docs.map((docSnapshot) => {
          return {
            ...docSnapshot.data(),
            id: docSnapshot.id
          }
        }
        );
        setAllData(products);
        setData(products);
      }),
    [collectionRef]
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleSort = (event) => {
    const category = event.target.className;
    const filteredData = allData.filter((item) => item.category === category);
    setData(filteredData);
  };

  const handleAll = () => {
    setData(allData);
  };
  console.log(data)

  return (
    <>
      <div className="products-buttons">
        <button className="Men's Clothing" onClick={handleSort}>
          Men's Clothing
        </button>
        <button className="Jewelery" onClick={handleSort}>
          Jewelery
        </button>
        <button className="Electronics" onClick={handleSort}>
          Electronics
        </button>
        <button className="Women's Clothing" onClick={handleSort}>
          Women's Clothing
        </button>
        <button className="All Products" onClick={handleAll}>
          All Products
        </button>
      </div>
      <div className="products-grid">
        {data &&
          data.map((product, index) => (
            <Product
              key={index}
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              description={product.description}
              image={product.image}
              onAddToCart={onAddToCart}
            />
          ))}
      </div>
    </>
  );
}