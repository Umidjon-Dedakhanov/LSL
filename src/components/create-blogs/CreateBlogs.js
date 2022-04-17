import React, {useEffect, useState} from 'react'
import "./CreateBlogs.css"
import axios from "axios";
import Course from "../course-delete/Course"

function CreateBlogs() {
    const [data, setData] = useState([])
    const [title, setTitle] = useState("")
    const [video, setVideo] = useState("")
    const [desc, setDesc] = useState("")
    const [type, setType] = useState("blogs")

    useEffect(() => {
        axios
          .get("https://glacial-beyond-89151.herokuapp.com/createblogs")
          .then((data) => setData(data.data))
          .catch(() => console.log("yoq"));
      }, []);

      const addBlogs = (e)=>{
        e.preventDefault()
        let obj =  {title, video: video.split("/")[video.split("/").length-1], desc, type}
        axios
        .post("https://glacial-beyond-89151.herokuapp.com/createblogs", obj )
        .then((data) => console.log(data.data))
        .catch(() => console.log("yoq"));

        setTitle("")
        setVideo("")
        setDesc("")
      }
      const deleteBlog = (id)=>{
        axios
        .delete("https://glacial-beyond-89151.herokuapp.com/createblogs/" + id )
        .then((data) => console.log(data.data.msg))
        .catch(() => console.log("yoq"));
      }
      const tabs = ["Blogs", "IELTS", "TKT", "Grammar", "CEFR"]
  return (
    <div className='create_blogs'>
        <div className="create_blogsContainer">
          <h1 className='create_blogsTitle'>Create Blogs</h1>
          <form onSubmit={addBlogs} className="create_blogsForm">
            <label className='create_blogsLabel' htmlFor="">Instructor</label>
            <input value={title} className='create_blogsInput' onChange={e=>setTitle(e.target.value)} placeholder="instructor" type="text" />
            <label className='create_blogsLabel' htmlFor="">YouTube video URL</label>
            <input value={video} className='create_blogsInput' onChange={e=>setVideo(e.target.value)} placeholder="video url" type="text" />
            <label className='create_blogsLabel' htmlFor="">Description</label>
            <input value={desc} className='create_blogsInput' onChange={e=>setDesc(e.target.value)} placeholder="description" type="text" />
            <select onChange={e=>setType(e.target.value)} className='create_blogsSelect'>
              {
                tabs.map((item,index)=>(
                  <option key={index} value={item.toLowerCase()}>{item}</option>
                ))
              }
            </select>
            <button className='create_blogsSubmit' type='submit'>submit</button>
          </form>
        </div>
        <div className="create_blogsDelete">
          <div className='create_blogsDeleteWrapper'>
            {
              data?.map((item,inx)=> <Course key={inx} content={item} deleteBlog={deleteBlog}/>)
            }
          </div>
        
        </div>
    </div>
  )
}

export default CreateBlogs