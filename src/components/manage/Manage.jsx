import React, { useState } from 'react';
import axios from '../../api/create-test';
import authHeaders from '../../utils/authHeader';

const Manage = () => {
  const [start, setStart] = useState({date: '', time: ''});
  const [end, setEnd] = useState({date: '', time: ''});
  const handleDeleteAllQuestions = () => {
    axios.delete("allquestions", authHeaders())
      .then(res => console.log(res))
      .catch(err => console.log(err ))
  }
  

  const handleSetTime = () => {
    axios.post("time",{startTime: `${start.date} ${start.time}`, endTime: `${end.date} ${end.time}`}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : authHeaders(),
        "Accept": "*/*",
        "Access-Control-Allow-Origin" : "*"
    }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  return (
    <div>
      <h1>Delete the TEST</h1>
      <button onClick={handleDeleteAllQuestions}>Delete the test</button>

      <h1>Start at</h1>
      <input type="date" value={start.date} onChange={(e) => setStart({...start, date: e.target.value})}/>
      <input type="time" value={start.time} onChange={(e) => setStart({...start, time: e.target.value})}/>

      <h2>End at</h2>
      <input type="date"  value={end.date} onChange={(e) => setEnd({...start, date: e.target.value})} />
      <input type="time"  value={end.time} onChange={(e) => setEnd({...start, time: e.target.value})}/>
      <button onClick={handleSetTime}>Set time</button>
    </div>
  )
}

export default Manage
