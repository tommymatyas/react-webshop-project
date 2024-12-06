import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from './components/Auth.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import SignIn from './components/SignIn.jsx'
import AddProduct from './components/AddProduct.jsx'
import Edit from './components/Edit.jsx'


createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/edit' element={<Edit />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
</StrictMode>,
);
