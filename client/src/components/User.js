import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import "./User.css";
import { NavLink } from "react-router-dom";

function User () {
    const [user, setUser] = useState(null); // Initialize user as null
    const [userId, setUserId] = useState(null); // Initialize userId as null

    useEffect(() => {
        // Fetch user details only if user ID is available
        if (userId) {
            fetch(`http://127.0.0.1:5505/users/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch user details");
                    }
                    return response.json();
                })
                .then(data => setUser(data))
                .catch(error => console.error("Error fetching user:", error));
        }
    }, [userId]); // Include userId in dependency array

    useEffect(() => {
        // Call your authentication logic to get the user ID after login
        const fetchedUserId = getUserId(); // Replace with actual logic to get user ID
        setUserId(fetchedUserId);
    }, []);

    // Function to get user ID, you'll replace this with your actual authentication logic
    function getUserId() {
        // Placeholder logic to get user ID, replace this with actual logic
        return 1; // Assuming user ID 1 for demonstration
    }

    return ( 
        <div className="user-container">
            <div className="user-navbar">
                <NavBar/>
                {/* Your NavBar content */}
            </div>

            <div className="user-content">
                {/* Check if user object is not null before accessing its properties */}
                {user && (
                    <div>
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                        <p>{user.phone_number}</p>
                        <NavLink exact="true" to="/Edit-User" className="home-more-button">Edit</NavLink>
                    </div>
                )}
            </div>
        </div>
     );
}
 
export default User;


