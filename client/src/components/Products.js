import React, { useEffect, useState, useContext } from "react";
import "./Product.css";
import { Cartcontext } from "../context/Context";

function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5505/products")
            .then((response) => response.json())
            .then(setProducts)
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const Globalstate = useContext(Cartcontext);
    const dispatch = Globalstate.dispatch;
    console.log(Globalstate);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product, index) => {
                    product.quantity = 1;
                    return (
                        <li className="cont" key={index}>
                            <div>
                                <img 
                                    src={product.image_url} 
                                    alt={product.name} 
                                    className="product-image"
                                />
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <button onClick={() => dispatch({ type: 'ADD', payload: product })}>
                                    Add to Cart
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Products;
