import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
  console.log(product);

  return (
    <div>
      <h2>ProductDetails Page</h2>
      {product ? (
        <div className="product-grid">
          <div className="product-card" key={product.id}>
            <p>{product.title}</p>
            <span>${product.price}</span>
            <img src={product.thumbnail} alt={product.title} />
          </div>
        </div>
      ) : (
        "No product"
      )}
    </div>
  );
}

export default ProductDetails;
