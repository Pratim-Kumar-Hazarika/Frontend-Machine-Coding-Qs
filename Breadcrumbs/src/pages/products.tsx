import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  return (
    <div>
      <h2>Products Listing Page</h2>
      <div className="product-grid">
        {products?.map((item) => {
          return (
            <div className="product-card" key={item.id}>
              <Link to={`/products/${item.id}`}>
                {" "}
                <p>{item.title}</p>
                <span>${item.price}</span>
                <img src={item.thumbnail} alt={item.title} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
