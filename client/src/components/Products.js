import React, { useEffect, useState } from "react";
import "./Product.css";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5505/products")
            .then((response) => response.json())
            .then(setProducts)
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li className="cont" key={product.id}>
                        <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="product-image"
                        />
                        <div>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <button>Add to Cart</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
