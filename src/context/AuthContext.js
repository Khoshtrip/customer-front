import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";
import { AuthenticationApi } from "../apis/AuthenticationApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await AuthenticationApi.fetchUser();
            setUser(response);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await AuthenticationApi.login(username, password);
            localStorage.setItem("access", response.access);
            localStorage.setItem("refresh", response.refresh);
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.access}`;
            await fetchUser();
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            const response = await AuthenticationApi.signup(userData);
            localStorage.setItem("access", response.access);
            localStorage.setItem("refresh", response.refresh);
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.token}`;
            await fetchUser();
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        delete api.defaults.headers.common["Authorization"];
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, login, signup, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};
