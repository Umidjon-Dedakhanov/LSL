import React from 'react';
import './Course.css';
import { FiPlay } from 'react-icons/fi';

const Course = ({content, setVideoShow}) => {
    const {desc, title, video, type} = content
    return (
        <div className="course">
            <div className='course_type'><span>{type}</span></div>
            <div className="course__video">
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <h1 className="course__title">{desc}</h1>
            <h2 className="course__instructor">{title}</h2>
            <button onClick={()=>setVideoShow(video)} className="course__calltoact"> <FiPlay/> Watch now</button>
        </div>
    )
}

export default Course
