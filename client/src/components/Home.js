import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5505/products")
        .then((r) => r.json())
        .then(setProducts);
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="product-image"
                        />
                        <div>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <Link to={`/product/${product.id}`}>Add to Cart</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;