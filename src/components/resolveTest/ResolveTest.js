import React, { useEffect, useState } from "react";
import axios from "../../api/create-test";
import updateInstance from '../../api/userAuth';
import { Redirect, useHistory, useLocation } from "react-router-dom";
import "./ResolveTest.css";
import AnswerSection from "../answerSection/AnswerSection";
import Loader from "../Loader/NewLoader";
import authHeaders from "../../utils/authHeader";
import { useSelector } from "react-redux";

function ResolveTest() {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [ansMatchData, setAnsMatchData] = useState([])
  const [result, setResult] = useState(0);
  const user = useSelector(state => state.user);
  console.log(user)
  let token = localStorage.getItem("user-token-start");

  useEffect(() => {
    try{
      if(token){
        axios
        .get("allquestions", {
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : authHeaders(),
              "Accept": "*/*",
              "Access-Control-Allow-Origin" : "*"
          }
        })
        .then((data) => setData(data.data))
        .catch((err) => {
          if(err.response.status === 401 || err.response.status === 403){
            localStorage.removeItem("user-token-start");
            localStorage.removeItem("user");
            history.push("/user/login")
          }
        });
      }
    }
    catch(err){
      console.log(err )
    }
   
  }, [token, history]);

  const compare = (aId, _id) => {
    answerData.forEach((i) => {
      if (i._id === _id) {
        let newData = answerData.filter((j) => j._id !== _id);
        setAnswerData(newData);
      }
    });
    setAnswerData((prev) => [...prev, { aId, _id }]);
  };

  const compareMatchingWords = (_id,qId, objAns,uzunlik, answerss) => {

    ansMatchData.forEach((i)=> {
      if(i._id === _id){
        let newMatchData = ansMatchData.filter(j=>  j._id !== _id);
        setAnsMatchData(newMatchData);
      }
    });
    
    let obj1 = [];
    if(objAns.ans1){
      let temp = {ans1: objAns.ans1}
      answerss.forEach(k=> {
        if(k.idx === objAns.ans1){
          temp.id1 = k.answerID;
          temp.sel1 = k.selectID;
        }
      })
      obj1.push(temp)
    }
    if(objAns.ans2){
      let temp = {ans2: objAns.ans2}
      answerss.forEach(k=> {
        if(k.idx === objAns.ans2){
          temp.id2 = k.answerID;
          temp.sel2 = k.selectID;
        }
      })
      obj1.push(temp)
    }
    if(objAns.ans3){
      let temp = {ans3: objAns.ans3}
      answerss.forEach(k=> {
        if(k.idx === objAns.ans3){
          temp.id3 = k.answerID;
          temp.sel3 = k.selectID;
        }
      })
      obj1.push(temp)
    }
    if(objAns.ans4){
      let temp = {ans4: objAns.ans4}
      answerss.forEach(k=> {
        if(k.idx === objAns.ans4){
          temp.id4 = k.answerID;
          temp.sel4 = k.selectID;
        }
      })
      obj1.push(temp)
    }
    if(objAns.ans5){
      let temp = {ans5: objAns.ans5}
      answerss.forEach(k=> {
        if(k.idx === objAns.ans5){
          temp.id5 = k.answerID;
          temp.sel5 = k.selectID;
        }
      })
      obj1.push(temp)
    }
    if(objAns.ans6){
      let temp = {ans6: objAns.ans6}
      answerss.forEach(k=> {
        if(k.idx === objAns.ans6){
          temp.id6 = k.answerID;
          temp.sel6 = k.selectID;
        }
      })
      obj1.push(temp)
    }
    if(objAns.ans7){
      let temp = {ans7: objAns.ans7}
      answerss.forEach(k=> {
        if(k.idx === objAns.ans7){
          temp.id7 = k.answerID;
          temp.sel7 = k.selectID;
        }
      })
      obj1.push(temp)
    }
    if(objAns.ans8){
      let temp = {ans8: objAns.ans8}
      answerss.forEach(k=> {
        if(k.idx === objAns.ans8){
          temp.id8 = k.answerID;
          temp.sel8 = k.selectID;
        }
      })
      obj1.push(temp)
    }

    setAnsMatchData(prev=> [...prev, {_id, qId, answersMatch: obj1}])
  }

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-answers"));
    if(savedNotes){
      setAnswerData(savedNotes)
    }
  }, []);

  useEffect(() => {
    const savedMatchData = JSON.parse(localStorage.getItem("ansMatchData"));
    if(savedMatchData){
      setAnsMatchData(savedMatchData)
    }
  }, []);



  useEffect(() => {
    localStorage.setItem("react-notes-answers", JSON.stringify(answerData));
  }, [answerData]);

  useEffect(() => {
    localStorage.setItem("ansMatchData", JSON.stringify(ansMatchData));
  }, [ansMatchData]);

  const sendAnswer = () => {

    axios
      .post("resolvetest/multiple", answerData)
      .then((res) => {
        setResult(res.data)
       
      })
      .catch(() => console.log("yoq"));

      localStorage.removeItem("react-notes-answers")
  };

  const sendAnsMatchData = () => {

    axios
      .post("resolvetest/matching", ansMatchData)
      .then((res) => {
        // setResult((score) => score + res.data);
      })
      .catch(() => {
        console.log("yoq");
      });
      localStorage.removeItem("ansMatchData");
  }

  useEffect(() => {
    // updateInstance.patch("/user/login/updatescore", {id: user.userId, score: result})
    // .then(final => {
    //   if(final.data.message > 0){
    //     history.push("/congrats");
    //     localStorage.clear();
    //     window.location.reload();
    //   }
    // })
    // .catch(err => console.log(err))
  }, [result]);

  let questionCount = 0
  if(data){
    data.forEach(i=>{
      if(i.questionType === "Multiple Choice"){
        questionCount += 1
      }else{
        questionCount += i.questions.length
      }
    })
  }
  
  return !token ?  <Redirect
  to={{
    pathname: "/enteringtest/paiduser",
    state: {
      from: location.pathname,
    },
  }}
/> : (
    <>
    {data.length ? (<div className="resolve">
      <div>
        {data?.map((question, inx) => (
          <AnswerSection key={inx} question={question} inx={inx} ansMatchData={ansMatchData}  compare={compare} compareMatchingWords={compareMatchingWords} answerData={answerData} />
        ))}
      </div>
      <button 
        className="btn_sendAnswers intro__submit"
        onClick={()=> {
        sendAnsMatchData();
        sendAnswer();
      }}>FINISH THE TEST</button>
      {/* <h1 style={{margin: "10px"}}>Your result { result || resultMatchData ? ` ${questionCount} / ${result + resultMatchData}` : ""} </h1> */}
    </div>): (
      <Loader/>      
    )}
    </>
  );
}

export default ResolveTest;
