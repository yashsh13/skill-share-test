import { createBrowserRouter, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import App from "../App";
import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import NotificationsPage from "../pages/Notification.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import FeatureInProcess from "../pages/Maintanence.jsx";
import RoomPage from "../pages/RoomPage.jsx";
import ChatPage from "../pages/ChatPage.jsx";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/user/isloggedin", {
          withCredentials: true,
        });
        if (res.data.loggedIn){
            setLoggedIn(true);
        }
      } catch {
        setLoggedIn(false);
      } finally {
        setChecked(true);
      }
    };
    verify();
  }, []);

  if (!checked) return null; 

  return loggedIn ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([   
    {
        path : "/",
        element : <App />,
        // errorElement: <Maintenance />,
        children : [
            {
                index: true,
                element: <LandingPage/>
            },
            {
                path : "landing",
                element : <LandingPage/>
            },
            {
                path : "login",
                element : <LoginPage/>
            },
            {
                path : "register",
                element : <RegisterPage/>
            },
            {
                path : "home",
                element : (
                    <ProtectedRoute>
                        <HomePage/>
                    </ProtectedRoute>)
            },
            {
                path : "notifications",
                element : (
                    <ProtectedRoute>
                        <NotificationsPage/>
                    </ProtectedRoute>)
            },
            {
                path : "profile",
                element : (
                    <ProtectedRoute>
                        <ProfilePage/>
                    </ProtectedRoute>)
            },
            {
                path : "update-profile",
                element : (
                    <ProtectedRoute>
                        <FeatureInProcess/>
                    </ProtectedRoute>)
            },
            {
                path : "join-room",
                element : (
                    <ProtectedRoute>
                        <RoomPage/>
                    </ProtectedRoute>)
            },
            {
                path : "chat",
                element : (
                    <ProtectedRoute>
                        <ChatPage/>
                    </ProtectedRoute>)
            }
        ]
    }
]);

export default router;