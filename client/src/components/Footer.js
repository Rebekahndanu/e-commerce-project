import React from 'react';
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>About Us</h5>
                        <p></p>
                    </div>
                    <div className="col-md-3">
                        <h5>Links</h5>
                        <ul>
                            <li><a href="/home">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/cart">Cart</a></li>
                            <li><a href="/product">Product</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Contact Us</h5>
                        <address>
                            123 Ngong Road<br />
                            Ngong, Kenya<br />
                            Email: group9@gmail.com<br />
                            Phone: +123456789
                        </address>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;