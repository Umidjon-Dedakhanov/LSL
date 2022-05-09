import React, { useState, useEffect } from 'react'
import "./DelayBack.css";
import { useTimer } from '../../hooks/useTimer';
import axioss from 'axios';
import ShowCounter from '../counter/Counter';
import updateInstance from '../../api/userAuth';
import Congrats from '../../routes/congrats/Congrats';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DelayTime({ endTime, mulAns, matchAns}) {
  const user = useSelector(state => state.user);

  const history = useHistory();
  console.log(endTime)
  var countDownDate = new Date(endTime).getTime();
  const [days, hours, minutes, seconds] = useTimer(countDownDate);
  const [result, setResult] = useState(0);
  const sendAnsMatchData = () => {
  
    axioss.all([
        axioss.post(`https://glacial-beyond-89151.herokuapp.com/resolvetest/matching`, 
          matchAns
        ), 
        axioss.post(`https://glacial-beyond-89151.herokuapp.com/resolvetest/multiple`, 
        mulAns
        )
      ])
      .then(axioss.spread((mat, mul) => {
        setResult(mat.data + mul.data)
      }));
  }
  useEffect(() => {
    updateInstance.patch("/user/login/updatescore", {id: user.userId, score: result})
    .then(final => {
      if(final.data.message > 0){
        history.push("/congrats");
        localStorage.clear();
        window.location.reload();
      }
    })
    .catch(err => console.log(err))
  }, [result]);
  if (days + hours + minutes + seconds <= 0) {
    sendAnsMatchData()
    localStorage.removeItem("user-token-start");
    localStorage.removeItem("user")
    // here check
    return <Congrats/>;
  } else {
    
    return (
      <div className="delay_time" style={hours < 1 && minutes < 5 ? {background: "#fbc6c6"} : {background: "#fff"}}>
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
      </div>
    );
  }
}

export default DelayTime