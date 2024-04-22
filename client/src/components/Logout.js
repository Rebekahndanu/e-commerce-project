import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      const response = await fetch('/userLogout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
      });

      if (response.ok) {
        // Clear JWT token from client-side storage (e.g., cookies, local storage)
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/Login'); 
        console.log('Logout successful'); 
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
 
export default Logout;