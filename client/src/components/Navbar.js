// import { NavLink } from 'react-router-dom';


// function Navbar(){
//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <NavLink className="navbar-brand" href="#">
//                 <b>E-Website</b>
//             </NavLink>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav ml-auto">
//                 <li className="nav-item active">
//                   <NavLink className="nav-link" to='/'>HOME <span className="sr-only">(current)</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to='/login'>LOGIN</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to='/register'>REGISTER</NavLink>
//                 </li>
                
            
//               </ul>
//             </div>
//         </nav>
//         </div>
//     )

// }

// export default Navbar 

import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css"
  
function NavBar () {
    const {cartTotalQuantity} = useSelector((state) => state.cart);
    return(
        <div className="container">
            {/* <div className="nav-logo">Bea<span>uty</span></div> */}
            <div className="bar-navbar">
            <ul>
                <li>
                    <NavLink exact='true' to="/" className="navlink" activeclassname="active">Home</NavLink>
                </li>
                <li>
                    <NavLink exact='true' to="/Products" className="navlink" activeclassname="active">Products</NavLink>
                </li>
                {/* <li>
                    <NavLink exact='true' to="/Login" className="navlink" activeclassname="active">Login</NavLink>
                </li>
                <li className="nav-menu">
                    <NavLink exact='true' to="/Signup" className="navlink" activeclassname="active">Sign Up</NavLink>
                </li> */}
                <li className="nav-menu">
                    <NavLink exact='true' to="/Cart" className="navlink" activeclassname="active">
                        <div className="nav-cart">
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="35" 
                        height="35" 
                        fill="currentColor" 
                        className="bi bi-cart4" 
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                    </svg>
                    <span className="cart-quantity">
                        <span>{cartTotalQuantity}</span>
                    </span> 
                        </div>
                     
                    </NavLink>
                </li>

                <li className="nav-menu">
                    <NavLink exact='true' to="/User" className="navlink" activeclassname="active">User</NavLink>
                </li>
                <li className="nav-menu">
                    <NavLink exact='true' to="/Logout" className="navlink" activeclassname="active">Logout</NavLink>
                </li>
                
                {/* <li className="home-button">
                    <NavLink exact='true' to="/Signup">Sign Up</NavLink>
                </li> */}
            </ul>
            </div>

        </div>
    )
}

export default NavBar