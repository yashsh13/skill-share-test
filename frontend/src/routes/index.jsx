import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import NotificationsPage from "../pages/Notification.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import FeatureInProcess from "../pages/Maintanence.jsx";
import RoomPage from "../pages/RoomPage.jsx";

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
                element : <HomePage/>
            },
            {
                path : "notifications",
                element : <NotificationsPage/>
            },
            {
                path : "profile",
                element : <ProfilePage/>
            },
            {
                path : "update-profile",
                element : <FeatureInProcess/>
            },
            {
                path : "join-room",
                element : <RoomPage/>
            }
        ]
    }
]);

export default router;