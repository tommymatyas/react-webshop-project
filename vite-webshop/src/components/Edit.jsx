import React, { useEffect, useState, useCallback, useMemo } from "react";
import { getDocs, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase.config";

export default function EditProducts() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const collectionRef = useMemo(() => collection(db, "products"), []);

  const getProducts = useCallback(() => {
    return getDocs(collectionRef).then((snapshot) => {
      const products = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));
      setAllData(products);
      setData(products);
    });
  }, [collectionRef]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleEdit = (productId, product) => {
    setEditProductId(productId);
    setEditValues(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (editProductId) {
      const productDoc = doc(db, "products", editProductId);
  
      
      const { ...updateData } = editValues;
      const sanitizedData = Object.keys(updateData).reduce((acc, key) => {
        acc[key] = updateData[key] !== undefined ? updateData[key] : ""; 
        return acc;
      }, {});
  
      console.log("Saving sanitized data to Firestore:", sanitizedData);
  
      updateDoc(productDoc, sanitizedData)
        .then(() => {
          alert("Product updated successfully!");
          setEditProductId(null); 
          getProducts(); 
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          alert("Failed to update product. Please try again.");
        });
    }
  };
  const handleDelete = (id) => {
      const documentRef = doc(db, 'products', id);
    deleteDoc(documentRef)
      .then(() => getProducts())
  }
  
  

  const handleCancel = () => {
    setEditProductId(null);
  };

  return (
    <div>
      <h1>Edit Products</h1>
      {data.map((product) => (
        <div key={product.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          {editProductId === product.id ? (
            // Szerkesztő mód
            <div>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={editValues.title || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={editValues.price || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={editValues.category || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Description:
                <textarea
                  name="description"
                  value={editValues.description || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            // Normál megjelenítés
            <div>
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <button onClick={() => handleEdit(product.id, product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
