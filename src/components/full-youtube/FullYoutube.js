import React from 'react'
import "./FullYoutube.css"
import {FiX} from "react-icons/fi"


function FullYoutube({setVideoShow,videoShow}) {
  return (
    <div className='full_youtube'>
        <div onClick={()=>setVideoShow("")} className="full_youtubeBg">
            <div><FiX/></div>
        </div>
        <div className="full_youtubeContainer">
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoShow}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    </div>
  )
}

export default FullYoutube