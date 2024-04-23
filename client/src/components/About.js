import React from 'react';
// import aboutImage from './about.jpg';
// import './About.css';
import NavBar from './Navbar';

function About() {
  return (
    <div className='about-page'>
      <div className="about-navbar">
             <NavBar/>
            {/* Your NavBar content */}
    </div>
      <div className='about-content'>
        <h1 className='about-title'>K-Cosmetics</h1>
        <p className='about-description'>Welcome to our sanctuary of beauty, where elegance meets indulgence in every product. Discover a curated collection of skincare essentials designed to nurture and revitalize your skin.
        This concise paragraph captures the essence of the beauty store's offerings and invites visitors to explore their skincare essentials. Adjust the content further if needed to match your requirements.
        Let us guide you on your journey to radiant, healthy-looking skin
        Immerse yourself in a world of luxury and self-care, where every purchase is a step towards embracing your natural beauty
        "Step into a world of sophistication and discover the secrets to timeless beauty with our exclusive collection</p>
      </div>
    </div>
  );
}

export default About;