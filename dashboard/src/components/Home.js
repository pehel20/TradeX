import React, { useEffect } from 'react';

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import ChatBot from "./ChatBot";

const Home = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            // Token passed from frontend via URL — save it into THIS app's localStorage
            localStorage.setItem("token", token);
            // Clean the token from the URL bar for security
            window.history.replaceState(null, "", "/");
        } else if (!localStorage.getItem("token")) {
            // No token anywhere — send to frontend login page
            window.location.href = `${process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000"}/login`;
        }
    }, []);

    return (
        <>
            <TopBar />
            <Dashboard />
            <ChatBot />
        </>
    );
};

export default Home;