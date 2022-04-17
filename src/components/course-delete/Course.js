import React from 'react';
import './Course.css';
import { AiOutlineDelete } from 'react-icons/ai';

const Course = ({content,deleteBlog}) => {
    const {desc, title, video, _id} = content
   
    return (
        <div className="course">
            <div className="course__video">
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <h1 className="course__title">{desc}</h1>
            <h2 className="course__instructor">{title}</h2>
            <button onClick={()=>deleteBlog(_id)} className="course__calltoact"> <AiOutlineDelete/>Delete</button>
        </div>
    )
}

export default Course
