import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/core/Header";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import KhoshAlert from "./components/core/KhoshAlert";
import "./styles/global.scss";
import PackagesPage from "./pages/PackagesPage";

function App() {
    return (
        <div className="App">
            <KhoshAlert />
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/packages" element={<PackagesPage />} />
            </Routes>
        </div>
    );
}

export default App;
