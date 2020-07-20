import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; 
import '../css/navbar.css';

const Navbar = (props) => {
    const { logoutUser } = useContext(AuthContext);

    const onClick = e => {
        logoutUser();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark justify-content-between nav-style">
                <Link className="navbar-brand" style={{fontSize: "2em"}} to="/main">MyBookList</Link>
                <div>
                    <Link className="navbar-brand" to="/account">Account</Link>
                    <Link onClick={onClick} className="navbar-brand" to="/">Logout</Link>
                </div>
        </nav>
    );
}

export default Navbar;