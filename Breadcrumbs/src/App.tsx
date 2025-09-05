import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetails from "./pages/product-details";
import BreadCumbs from "./components/BreadCumbs";

function App() {
  return (
    <BrowserRouter>
      <h1>Bread Crumbs</h1>
      <BreadCumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
