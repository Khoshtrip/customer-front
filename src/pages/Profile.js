import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="profile">
            <h1>Welcome {user.firstName}!</h1>
            <div className="profile-info">
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Phone Number:</strong> {user.phoneNumber}
                </p>
            </div>
        </div>
    );
};

export default Profile;
