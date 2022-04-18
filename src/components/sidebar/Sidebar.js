import React from 'react';
import { NavLink, useRouteMatch, Link } from 'react-router-dom';
import { SIDEBAR_STATIC_DATA } from '../../static/sidebar__data';
import logo from '../../assets/logos/logo.jpg'
import './Sidebar.css';

const Sidebar = () => {
    const { url } = useRouteMatch();
    return (
        <div className="admin__sidebar">
            <Link to="/">
                <img className="sidebar__logo" src={logo} alt=""/>
            </Link>
            {
                SIDEBAR_STATIC_DATA.map(sidebar_link => 
                    <NavLink activeClassName="sidebar__activetabs" className="sidebar__tabs" key={sidebar_link.id} to={`${url}/${sidebar_link.route}`}>
                       {sidebar_link.icon} <span>  {sidebar_link.sidebarTitle}</span>
                    </NavLink>    
                )
            }
        </div>
    )
}

export default Sidebar
