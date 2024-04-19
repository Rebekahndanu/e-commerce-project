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
                </div>
            ))}
        </div>
        <div className="About">

        </div>
        <div className="categoties">

        </div>
        </>
        
    );
}

export default Home;
