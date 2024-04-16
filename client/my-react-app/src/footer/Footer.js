import'./footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="sb_footer section_padding">
                <div className="sb_footer_links-div">
                    <h4></h4>
                    <p></p>
                </div>
                <div className="sb_footer-links_div">
                    <h4>SHOP</h4>
                    <a href="">
                        <p></p>
                    </a>
                    <a href="">
                        <p></p>
                    </a>
                    <a href="">
                        <p></p>
                    </a>
                    <a href="">
                        <p></p>
                    </a>
                </div>
                
                <div className="sb_footer-links_div">
                    <h4>ABOUT US</h4>
                    <a href="/about">
                        <p>About</p>
                    </a>
                    <a href="/">
                        <p>Home</p>
                    </a>
                    <a href="/search">
                        <p>Search</p>
                    </a>
                    <a href="/contact">
                        <p>Contact</p>
                    </a>
                </div> 
                    <div className="sb_footer-below-links">
                        <h4>ADDRESS</h4>
                        <a href="">
                            <p>Ngon Lane</p>
                        </a>
                        <a href="">
                            <p>group9@gmail.com</p>
                        </a>
                        <a href="">
                            <p>0712345678</p>
                        </a>
                        
                    </div>
                    <div className="sb_footer-below">
                </div> 
            </div>
            <div className="sb_footer-copyright">
                        <p>
                            @{new Date().getFullYear()} Group14. Blingg Jewelry || Powered By makithe_macky 
                        </p>
                </div>  
        </div>
    
    );
}

export default Footer;