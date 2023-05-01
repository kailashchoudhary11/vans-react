import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    };

    return (
        <header>
            <Link className="site-logo" to=".">#VanLife</Link>
            <nav>
                <NavLink 
                    to="host" 
                    style={({isActive}) => isActive ? activeStyle : null}>
                    Host
                </NavLink>

                <NavLink 
                    to="about" 
                    style={({isActive}) => isActive ? activeStyle : null}>
                    About
                </NavLink>

                <NavLink 
                    to="vans" 
                    style={({isActive}) => isActive ? activeStyle : null}>
                    Vans
                </NavLink>

                <Link
                    to="login"
                    className="login-link"
                >
                    Login
                    {/* <img 
                        src="../assets/images/avatar-icon.png" 
                        className="login-icon"
                    /> */}
                </Link>
            </nav>
        </header>
    );
}