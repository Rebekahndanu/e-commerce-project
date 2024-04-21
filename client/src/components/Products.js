import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import NavBar from "./Navbar";
import { useGetAllProductsQuery } from "../features/productsApi";
import {useDispatch } from "react-redux";
// import { useHistory} from "react-router"
import { addToCart } from "../features/cartSlice";


function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // const { items, status } = useSelector(state => state.products)
    const {data, error, isLoading} = useGetAllProductsQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate("/Cart");
    }

    // useEffect(() => {
    //     fetch("http://127.0.0.1:5505/products")
    //         .then((r) => r.json())
    //         .then(data => setProducts(data));
    // }, []);

    // const Globalstate = useContext(Cartcontext);
    // const dispatch = Globalstate.dispatch;
    // console.log(Globalstate);

    function handleName(event) {
        const input = event.target.value;
        setName(input);

        // Fetch suggestions based on current input
        fetch(`http://127.0.0.1:5505/products?name=${input}`)
            .then(response => response.json())
            .then(data => setSuggestions(data))
            .catch(error => console.error('Error fetching suggestions:', error));
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Fetch search results based on input
        fetch(`http://127.0.0.1:5505/products?name=${name}`)
            .then(response => response.json())
            .then(data => {
                console.log('Search results:', data);
                setProducts(data);
            })
            .catch(error => console.error('Error fetching search results:', error));
    }

    function handleSuggestionClick(suggestionName) {
        setName(suggestionName);
        setSuggestions([]); // Clear suggestions
    }
    return (
        <div className="products-container">
            <div className="products-navbar">
                <NavBar/>
                {/* Your NavBar content */}
            </div>
            <div className="products-content">

            <h1 className="products-h1">Products</h1>

            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by Name"
                    value={name}
                    onChange={handleName}
                />
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>

            <ul>
                {suggestions.map((product) => (
                    <li key={product.id} onClick={() => handleSuggestionClick(product.name)}>
                        <div>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <Link to={`/product/${product.id}`}>View Details</Link>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="products-inventory-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>An error occurred..</p>
                ) : (
                    <>
                        {data &&
                            data?.map((product) => (
                        <div className="products-card" key={product.id}>
                        <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="product-image"
                        />
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <button onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                            </button>
                        </div>
                        ))}
                    </>
                    
                )}
                
                    
                </div>

            </div>

        </div>
    )
}

export default Products;


