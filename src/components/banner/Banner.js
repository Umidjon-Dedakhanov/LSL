import React from 'react';
import './Banner.css';
import { FiClock, FiUserCheck, FiVideo } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import bannerImage from '../../assets/ban.png';

const Banner = () => {
    return (
        <div className="main__banner">
            <div className="banner__intro">
                <h1>Find the Best Courses and Amazing Mentor</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus </p>
                {/* <div className="intro__searchbar">
                    <FiSearch/>
                    <form className="banner_form">
                        <input type="text" placeholder="Type in the course you want to learn" className="intro__search"/>
                        <button type="submit" className="intro__submit">Search</button>
                    </form>
                </div> */}
                <Link to="/enteringtest" className=''>
                 <button type="submit" className="intro__submit mb-3">ENTER TKT TEST</button>
                </Link>
                <ul className="intro__sections">
                    <li className="section__item"> <FiClock/> Life Time Access</li>
                    <li className="section__item"> <FiUserCheck/> Expert Mentor</li>
                    <li className="section__item"> <FiVideo/> Variety of courses</li>
                </ul>
            </div>

            <div className="banner__image">
                <img width="100%" src={bannerImage} alt="" />
            </div>
        </div>
    )
}

export default Banner
