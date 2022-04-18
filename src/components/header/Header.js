import React from 'react';
import './Header.css';
import logo from '../../assets/logos/logo.jpg'
import { Link } from 'react-router-dom';

const Header = ({setPopup}) => {
    return (
        <div className="main__header">
            <div className="header__container">
                <div className="header__logo">
                   <img src={logo} alt="" />
                </div>
                <Link to="/admin" className="header__login">Admin</Link>
                <button className="header__signup" onClick={() => setPopup(true)}>Register</button>
            </div>
        </div>
    )
}

export default Header
