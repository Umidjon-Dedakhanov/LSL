import React from 'react'
import "./DelayTime.css";
import { useTimer } from '../../hooks/useTimer';
import ShowCounter from '../counter/Counter';
import StartTest from '../start-test/StartTest';

function DelayTime({startTime}) {
  var countDownDate = new Date(startTime).getTime();
  const [days, hours, minutes, seconds] = useTimer(countDownDate);
  if (days + hours + minutes + seconds <= 0) {
    return <StartTest/>;
  } else {
    localStorage.removeItem("user-token-start");
    localStorage.removeItem("user")
    // here check
    return (
      <div className="delay_time">
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