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
import "./Navbar.css"
  
function NavBar () {
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
                <li>
                    <NavLink exact='true' to="/Login" className="navlink" activeclassname="active">Login</NavLink>
                </li>
                <li className="nav-menu">
                    <NavLink exact='true' to="/Signup" className="navlink" activeclassname="active">Sign Up</NavLink>
                </li>
                <li className="nav-menu">
                    <NavLink exact='true' to="/Cart" className="navlink" activeclassname="active">Cart</NavLink>
                </li>

                <li className="nav-menu">
                    <NavLink exact='true' to="/User" className="navlink" activeclassname="active">User</NavLink>
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