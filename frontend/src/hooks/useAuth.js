import { useState, useEffect } from 'react';
import axios from 'axios';

// Authentication Hook - checks if user is logged in
function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myCoin, setMyCoin] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function checkLogin() {
      try {
        const { data } = await axios.post(
          'http://localhost:3001/api/user/me',
          {},
          { withCredentials: true }
        );
        if (!isMounted) return;
        if (data?.success) {
          setIsLoggedIn(true);
          // Optionally fetch profile if provided elsewhere
          setUser(data?.user || null);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch {
        if (!isMounted) return;
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    checkLogin();

    async function fetchCoin() {
      try {
        const { data } = await axios.post(
          'http://localhost:3001/api/user/mycoins',
          {},
          { withCredentials: true }
        );
        if (data?.success) {
          setMyCoin(data?.coins || 0);
        }
      } catch {
        console.log("cant fetch your coins");
      }
    }
    fetchCoin();
  }, []);

  const logout = () => {
    // Call backend logout then clear local state
    axios.post('http://localhost:3001/api/user/logout', {}, { withCredentials: true })
      .catch(() => {})
      .finally(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  };

  return { isLoggedIn, user, logout, loading , myCoin};
}

export default useAuth;
