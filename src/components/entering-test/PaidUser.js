import React, { useEffect, useState} from 'react';
import axios from '../../api/create-test';
import userLogin from '../../api/userAuth';
import { useSelector  } from 'react-redux'
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import DelayTime from '../delay-time/DelayTime'
import "./Paid.css";

function PaidUser() {
  const location = useLocation();
  const [startTimeRes, setStartTime] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
   function getTime() {
     setLoading(true);
    axios.get("time")
    .then(res => {
      setStartTime(res.data[0])
      setLoading(false);
    })
    .catch(err =>{ 
      console.log(err )
      setLoading(false);
    })
   }
   return getTime()
  }, [])

  const history = useHistory();
  const userLoc = JSON.parse(localStorage.getItem("user"));
  const user = useSelector(state => state.user);
  const handleToken = () => {
    console.log(userLoc?.user.userId)
    userLogin.post("user/login/start", {id: userLoc?.user.userId})
      .then(response => {
        if(response.data.token){
          localStorage.setItem("user-token-start", response.data.token);
          history.push("/resolvingtest")
        }
      })
      .catch(err => console.log(err))
  }
  return !user ?  <Redirect
        to={{
          pathname: "/user/login",
          state: {
            from: location.pathname,
          },
        }}
      /> : (
    <div className='paid_user'>
      {
        !loading ? <>
        {
          user && startTimeRes ? <DelayTime startTime={startTimeRes?.startTime}/> : <div className='paid_userEntering'>
          <div className="main__start">
          <div className="start_vawe" onClick={handleToken}>
            <div className="main_start_btn">
                <div className="wave-card-shape"></div>
                <div className="wave-card-shape"></div>
                <div className="wave-card-shape"></div>
                <div className="wave-card-shape"></div>
                <div className="wave-card-shape"></div>
            </div>
            <p className="start_text">START</p>
          </div>
        </div>
     </div>
      }      
        </> : <p className="loading_text">Loading...</p>
      }
        
    </div>
  )
}

export default PaidUser