import React from "react";
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <Link to="/">
                #VANLIFE
            </Link>
            <Link to="/about">
                About
            </Link>
            <Link to="/vans">
                Vans
            </Link>
        </>
    );
}