import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; 
import "./Home.css";
import sliderData from "./sliderData";
import NavBar from "./Navbar";
import Footer from "./Footer";
// import About from "./About";

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideLength = sliderData.length;
    // const navigate = useNavigate();

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        setCurrentIndex(currentIndex === slideLength - 1 ? 0 : currentIndex + 1);
    };

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? slideLength - 1 : currentIndex - 1);
    };

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        setCurrentIndex(0);
    }, []);

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
        // eslint-disable-next-line
    }, [currentIndex]);
    
    return (
        <>
            <div className="home-container">
                <div className="home-navbar">
                    <NavBar/>
                    {/* Your NavBar content */}
                </div>
                <div className="slider">
                    <FontAwesomeIcon icon={faArrowLeft} className="arrow prev" onClick={prevSlide} />
                    <FontAwesomeIcon icon={faArrowRight} className="arrow next" onClick={nextSlide} /> 

                    {sliderData.map((slide, index) => (
                        <div className={index === currentIndex ? "current slide" : "slide"} key={index}>
                            <img src={slide.image} alt="slide" />
                            <div className="content">
                                <h2>{slide.title}</h2>
                                <p>{slide.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
