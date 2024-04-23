import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import "./UserEdit.css";

function Edit_User() {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
    });

    const [userId, setUserId] = useState(null); // Initialize userId as null

    useEffect(() => {
        // Call your authentication logic to get the user ID after login
        const fetchedUserId = getUserId(); // Replace with actual logic to get user ID
        setUserId(fetchedUserId);
    }, []);

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

    // Function to get user ID, you'll replace this with your actual authentication logic
    function getUserId() {
        // Placeholder logic to get user ID, replace this with actual logic
        return 1; // Assuming user ID 1 for demonstration
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!user || !user.id) {
            console.error("User data is not available or user ID is missing");
            return;
        }

        fetch(`http://127.0.0.1:5505/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update user");
            }
            return response.json();
        })
        .then(data => {
            console.log("User updated:", data);
        })
        .catch(error => console.error("Error updating user:", error));
    }

    return ( 
        <div className="user-container">
            <div className="user-navbar">
                <NavBar/>
                {/* Your NavBar content */}
            </div>

            <div className="user-content">
                <form onSubmit={handleSubmit} className='signup-form'>
                    <input 
                        type="text" 
                        className='signup-input' 
                        name="name" 
                        onChange={handleChange} 
                        value={formData.name} 
                        placeholder="Username"
                    />
                    <input 
                        type='text' 
                        className='signup-input' 
                        name="email" 
                        onChange={handleChange} 
                        value={formData.email} 
                        placeholder="Email"
                    />
                    <input 
                        type="text" 
                        className='signup-input' 
                        name="phone_number" 
                        onChange={handleChange} 
                        value={formData.phone_number} 
                        placeholder="Phone Number"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Edit_User;

