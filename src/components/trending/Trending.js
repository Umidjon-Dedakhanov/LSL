import React, {useEffect, useState}  from 'react';
import './Trending.css';
import Course from '../course-demo/Course';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import FullYoutube from '../full-youtube/FullYoutube';
import Loader from "../Loader/NewLoader"

const Trending = () => {
    const [data, setData] = useState([])
    const [videoShow, setVideoShow] = useState("")
    const [filterType, setFilterType] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
          .get("https://glacial-beyond-89151.herokuapp.com/createblogs/"+filterType)
          .then((data) => {
            setData(data.data)
            setLoading(false)
        })
          .catch(() => {});
      }, [filterType]);
    document.body.style.overflow = videoShow ? "hidden" : "auto"
    const tabs = ["All","Blogs", "IELTS", "TKT", "Grammar", "CEFR"]
    return (
        <>
            <h1 className="trending__title">Trending Courses</h1>
            <div className="trending__tabs">
                {
                        tabs.map((tab, index, arr) => 
                            <NavLink 
                                key={index} 
                                className="tab" 
                                onClick={()=> {
                                setFilterType(tab.toLowerCase())
                                setData([])
                            }} activeClassName="tab__active" to={`/video/${tab}courses`}>{tab}</NavLink>    
                        )
                }
            </div>
            <div className="main__trending">
                {
                    data.length ?
                    data?.map((item,inx)=> <Course key={inx} content={item} setVideoShow={setVideoShow}/>)
                    :
                    loading? 
                    <Loader/>
                    :
                    <h3 className='tending_empty'>Empty</h3>
                }
            </div>
            {
                videoShow &&  <FullYoutube videoShow={videoShow} setVideoShow={setVideoShow}/>
            }
           
        </>
    )
}

export default Trending
