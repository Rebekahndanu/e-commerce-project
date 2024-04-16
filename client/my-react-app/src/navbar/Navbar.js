import './navbar.css'
import { NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Navbar(){
    return(
        <div className="navbar">
            <div className="nav-links-left">
                <NavLink className="nav-link" to=""></NavLink>
                <NavLink className="nav-link" to=""></NavLink>
                <NavLink className="nav-link" to=""></NavLink>
                <NavLink className="nav-link" to=""></NavLink>
            </div>
            <div className="nav-text">
                <h1></h1>
            </div>
            <div className="nav-links-right">
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="About">About</NavLink>
                <NavLink className="nav-link" to="Contact">Contact</NavLink> 
                <SearchIcon className='nav-link'/>
                <ShoppingCartOutlinedIcon className='nav-link'/>
            </div>
           
            
        </div>
    )
}

export default Navbar; 