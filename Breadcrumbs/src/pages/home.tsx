import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const products = data.products.slice(0, 6);
        setTrendingProducts(products);
      });
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <span>Trending Products 🔥</span>
      <div className="product-grid">
        {trendingProducts?.map((item) => {
          return (
            <div className="product-card" key={item.id}>
              <Link to={`/products/${item.id}`}>
                {" "}
                <p>${item.title}</p>
                <span>{item.price}</span>
                <img src={item.thumbnail} alt={item.title} />
              </Link>
            </div>
          );
        })}
      </div>
      <Link to={"/products"}>
        <button>View All Products</button>
      </Link>
    </div>
  );
}

export default Home;
