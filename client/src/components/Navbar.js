import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark justify-content-between nav-style">
                <Link className="navbar-brand" style={{fontSize: "2em"}} to="/main">MyBookList</Link>
                <div>
                    <Link className="navbar-brand" to="/account">Account</Link>
                    <Link className="navbar-brand" to="/">Logout</Link>
                </div>
        </nav>
    );
}

export default Navbar;