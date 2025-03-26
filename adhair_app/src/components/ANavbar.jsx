import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBox, FaHome } from "react-icons/fa";
import "./Style/Sidebar.css"; // Asegúrate de actualizar el nombre del archivo CSS

const A_Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button className="home-btn" onClick={() => navigate("/Crudam")}>
        <FaHome className="icon" /> Inicio
      </button>
      <ul className="nav-list">
        <li>
          <Link to="/usuarios">
            <FaUser className="icon" /> Usuarios
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <FaBox className="icon" /> Ordenes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default A_Navbar;
