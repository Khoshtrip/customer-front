import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/core/Header";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import KhoshAlert from "./components/core/KhoshAlert";
import "./styles/global.scss";
import PackagesPage from "./pages/PackagesPage";
import PurchasePage from "./pages/PurchasePage";
import HistoryPage from "./pages/HistoryPage";
import { AuthContext } from "./context/AuthContext";

function App() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div className="App">
            <KhoshAlert />
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                {isAuthenticated && (
                    <>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/packages" element={<PackagesPage />} />
                        <Route
                            path="/purchase/:transactionId"
                            element={<PurchasePage />}
                        />
                        <Route path="/history" element={<HistoryPage />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
