import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/logout', {
          method: 'POST',
          credentials: 'include',
        });

        if (response.status === 200) {
          // Remove the jwtoken cookie
          document.cookie = 'jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          navigate('/signin', { replace: true });
        } else {
          const error = new Error(response.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleLogout();
  }, []);

  return null;
};

export default Logout;
