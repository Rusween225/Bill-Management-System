import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt,FaFileInvoice } from "react-icons/fa"; // Icons
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Bill Management</h2>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <FaHome className="icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/InvoiceForm">
          <FaFileInvoice className="icon" />Invoice</Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser className="icon" /> Profile
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog className="icon" /> Settings
          </Link>
        </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
