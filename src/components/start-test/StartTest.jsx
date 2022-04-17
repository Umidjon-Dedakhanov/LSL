import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import userLogin from '../../api/userAuth';
import './StartTest.css';

const StartTest = () => {
  const history = useHistory();
  const user = useSelector(state => state.user);
  const handleToken = () => {
    userLogin.post("user/login/start", {id: user?.userId})
      .then(response => {
        if(response.data.token){
          localStorage.setItem("user-token-start", response.data.token);
          history.push("/resolvingtest")
        }
      })
      .catch(err => console.log(err))
  }
  return (
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
  )
}

export default StartTest
