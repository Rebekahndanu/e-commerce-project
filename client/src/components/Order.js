import NavBar from "./Navbar";
import "./Order.css"

const Orders = () => {
    return ( 
        <div className="order-container">
            <div className="order-navbar">
                <NavBar/>
                {/* Your NavBar content */}
            </div>
            <div className="order-content">
                <h2>My Orders</h2>
            </div>
        </div>
        
     );
}
 
export default Orders;