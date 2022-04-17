import React from 'react';
import './BasicAnalytics.css';
import { FiVideo, FiUsers, FiMapPin, FiClipboard } from 'react-icons/fi'
import { Link } from 'react-router-dom';

const BasicAnalytics = () => {
    return (
        <>
            <div className="main__bcanalyctics">
                <div className="bcana__items">
                    <FiVideo/>
                    <h1>10+</h1>
                    <p>Video Courses</p>
                </div>
                <div className="bcana__items">
                    <FiUsers/>
                    <h1>3000+</h1>
                    <p>Online Students</p>
                </div>
                <div className="bcana__items">
                    <FiMapPin/>
                    <h1>3+</h1>
                    <p>Branches</p>
                </div>
                <div className="bcana__items">
                    <FiClipboard/>
                    <h1>1000+</h1>
                    <p>Online Tests</p>
                </div>
            </div>
            <div className="become__student">
                <div className="bcstudent__image">
                    <img src="https://coachingsquare.in/wp-content/uploads/2021/06/IELTS-Coaching-Coaching-Square.webp" alt="" />
                </div>
                <div className="bcstudent__text">
                    <h1>Become a Student</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eu in orci, nunc amet libero. Nam scelerisque vestibulum bibendum a turpis. Ante feugiat lectus massa, odio amet. Auctor sit mattis non id proin elit placerat. Lectus morbi amet et aliquam magna mauris.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eu in orci, nunc amet libero. Nam scelerisque vestibulum bibendum a turpis. Ante feugiat lectus massa, odio amet. Auctor sit mattis non id proin elit placerat. Lectus morbi amet et aliquam magna mauris.</p>
                    <Link to="/newstudent" className="text__calltoact"> Start now </Link>
                </div>
            </div>
        </>
    )
}

export default BasicAnalytics
