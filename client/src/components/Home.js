import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; 
import "./Home.css";
import sliderData from "./sliderData";
import { NavLink } from "react-router-dom";

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideLength = sliderData.length;

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        setCurrentIndex(currentIndex === slideLength -1 ? 0 : currentIndex + 1)
    }

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? slideLength - 1 : currentIndex - 1);
    }

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(() => {
        setCurrentIndex(0)
    },[])

    useEffect(() => {
        if (autoScroll) {
            auto();
        }  
        return () => clearInterval(slideInterval)  
        // eslint-disable-next-line
    },[currentIndex]);

    return (
        <>
        <div className="slider">
            <FontAwesomeIcon icon={faArrowLeft} className="arrow prev" onClick={prevSlide} />
            <FontAwesomeIcon icon={faArrowRight} className="arrow next" onClick={nextSlide} /> 

<<<<<<< HEAD
            <h1 className="home-h1">Products</h1>

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

           <div className="goods">           <ul className="goods">
                {suggestions.map((product) => (
                    <li key={product.id} onClick={() => handleSuggestionClick(product.name)}>
                        <div className="productcard">
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <Link to={`/product/${product.id}`}>View Details</Link>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="home-inventory-container">
                    {products.map((product, index) => (
                        <div className="home-card" key={index}>
                        <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="product-image"
                        />
                            <h3>{product.name}</h3>
                            <p>Price: {product.price}</p>
                            <Link to={`/product/${product.id}`} className="home-more-button">Add to Cart</Link>

                        </div>
                    ))}
=======
            {sliderData.map((slide, index) => (
                <div className={index === currentIndex ? "current slide" : "slide"} key={index}>
                    {index === currentIndex && (
                        <>
                            <img src={slide.image} alt="slide" />
                            <div className="content">
                                <h2>{slide.title}</h2>
                                <p>{slide.body}</p>
                                <p className="homebtn">
                                    <NavLink exact='true' to="/Signup">Sign Up</NavLink>
                                </p>
                            </div>
                        </>
                    )}
>>>>>>> 427e2d31ecad2b5cdd8aacec66959b73b529339f
                </div>
            ))}
        </div>
        <div className="About">

        </div>
<<<<<<< HEAD
        </div>
    )
=======
        <div className="categoties">

        </div>
        </>
        
    );
>>>>>>> 427e2d31ecad2b5cdd8aacec66959b73b529339f
}

export default Home
