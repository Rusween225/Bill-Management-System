import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePicture: null, // Optional
    lastBills: [],
  });

  // Ref for the file input element
  const fileInputRef = useRef(null);

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevState) => ({
          ...prevState,
          profilePicture: reader.result, // Store the image as a base64 encoded string
        }));
      };
      reader.readAsDataURL(file); // Read the file as a base64 string
    }
  };

  // Trigger the file input click when the profile image is clicked
  const handleProfileImageClick = () => {
    fileInputRef.current.click(); // Programmatically click the file input
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = "rusween123@gmail.com"; // Replace with dynamic email or fetched from auth
        const userResponse = await axios.get(`/api/users/${email}`);
        setUser(userResponse.data);

        const billsResponse = await axios.get(`/api/bills/user/${userResponse.data.id}`);
        setUser((prevState) => ({
          ...prevState,
          lastBills: billsResponse.data,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user.name) return <div>Loading...</div>; // Loading state

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>

      <div className="profile-details">
        <div className="profile-picture" onClick={handleProfileImageClick}>
          {/* Circle image or placeholder */}
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="profile-img"
            />
          ) : (
            <div className="placeholder-img">No Image</div>
          )}
        </div>

        <div className="user-info">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>

        {/* Circular upload button */}
        <div className="upload-section">
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: "none" }} // Hide the file input
          />
        </div>
      </div>

      <div className="bill-history">
        <h3>Last 10 Generated Bills</h3>
        <ul>
          {user.lastBills.length > 0 ? (
            user.lastBills.map((bill) => (
              <li key={bill.id}>
                <Link to={`/bill/${bill.id}`}>
                  <span>{bill.date}</span>
                  <span>{`$${bill.total.toFixed(2)}`}</span>
                </Link>
              </li>
            ))
          ) : (
            <p>No bills available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;




