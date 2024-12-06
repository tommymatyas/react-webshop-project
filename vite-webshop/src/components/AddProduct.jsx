import { useState } from "react"
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";
export default function AddProduct({ getTodos }) {
    const [titleText, setTitleText] = useState("");
    const [priceText, setPriceText] = useState("");
    const [descriptionText, setDescriptionText] = useState("");
    const [categoryText, setCategoryText] = useState("");
    const [imageText, setImageText] = useState("");
    const collectionRef = collection(db, "products");
    const navigate = useNavigate();
   
   
    const handleAddproduct = () => {
    try {
      addDoc(collectionRef, {
        title: titleText,
        price: Number(priceText),
        description: descriptionText,
        category: categoryText,
        image: imageText,
        
      })
        .then(() => {
          console.log("data has been added")
          navigate('/');
          console.log(collectionRef)
        })
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="add-product" style={{ border: "1px solid black", padding: 20 }}>
      <input type="text" placeholder="title" value={titleText} onChange={(event) => setTitleText(event.target.value)} />
      <input type="text" placeholder="price" value={priceText} onChange={(event) => setPriceText(event.target.value)} />
      <input type="text" placeholder="description" value={descriptionText} onChange={(event) => setDescriptionText(event.target.value)} /> 
      <input type="text" placeholder="category" value={categoryText} onChange={(event) => setCategoryText(event.target.value)} /> 
      <input type="text" placeholder="image" value={imageText} onChange={(event) => setImageText(event.target.value)} /> 
      <button onClick={handleAddproduct}>add product</button>
    </div>
  )
}
