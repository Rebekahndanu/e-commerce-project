import React from 'react';
import aboutImage from './about.jpg'; // Import the image
import './About.css'; // Import the CSS file for styling

function About() {
  return (
    <div className='about-page'>
      <img src={aboutImage} alt='About' className='about-image' /> {/* Use the imported image */}
      <div className='about-content'>
        <h1 className='about-title'>BEAUTY STORE</h1>
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
