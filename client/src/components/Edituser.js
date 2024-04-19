import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";

function User () {

    const [user, setUser] = useState([])
    const [history, setHistory] = useState({
        name: "",
        email: "",
        phone_number: "",
    });

    useEffect(()=>{
        fetch('/users')
        .then(response=> response.json())
        .then(data => setUser(data))
    })

    function handleChange(){

    }

    function handleSubmit(event){
        event.preventDefault()

        fetch(`/users/${user}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Inventory updated:", data)
        });
    }
    return ( 
        <div className="user-conatiner">
            <div className="home-navbar">
                <NavBar/>
                {/* Your NavBar content */}
            </div>

            <div className="user-content">
                <form onSubmit={handleSubmit}>
                    <input type="text" className='signup-input' onChange={handleChange} value={}>Username</input>
                    <input type='text' className='signup-input' onChange={handleChange} value={}>Email</input>
                    <input type="integer" className='signup-input' onChange={handleChange} value={}>Phone Number</input>
                </form>
            </div>
        </div>
     );
}
 
export default User;