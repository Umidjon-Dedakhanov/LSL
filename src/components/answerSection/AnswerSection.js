import React, { useState, useEffect } from "react";
import "./AnswerSection.css";
import { v4 } from "uuid";

let length;
let selectedValues;
function AnswerSection({
  question,
  compare,
  ansMatchData,
  compareMatchingWords,
  answerData,
  inx
}) {
  const [activeClass, setactiveClass] = useState({});
  const [idxAns, setIdxAns] = useState({
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    ans5: "",
    ans6: "",
    ans7: "",
    ans8: "",
  });

  // const total = 0;
  // let all = [...ansMatchData, ...answerData];

  useEffect(() => {
    answerData.forEach(({ aId }) => {
      setTimeout(function () {
        let datas = window.document.getElementById(`z${aId}`);
        datas.className = "answer_containerSelect activeAnswer";
      }, 100);
    });
  }, [answerData]);

  if (question.questionType === "Matching Words") {
    question.answers = question.answers.filter((i) => i.text.length > 0 && i);
    length = question.questions.length;
  }

  const removeClass = (e) => {
    Array.from(e.parentElement.childNodes).forEach(
      (i) => (i.className = "answer_containerSelect")
    );
  };


  selectedValues = idxAns;

  const onChangeHandler = ()=>{
    setTimeout(()=> {
      console.log(selectedValues)
      compareMatchingWords(
        question._id,
        question.qId,
        selectedValues,
        question.answers.length,
        question.answers
      );
    },100) 
  }
  return (
    <div className="answer_container" key={question._id}>
      <div className="answer_containerTitle">
        <h2 style={{color: "darkblue"}}>{question?.question?.split(">")[0]}</h2>
        <span>{inx+1}. {question?.question?.split(">").splice(1, question?.question?.split(">")?.length - 1).join(">")}</span>
      </div>
      <ul>
        {question.questionType === "Multiple Choice" &&
          question.answers?.map((answer) => (
            <li
              id={`z${answer.aId}`}
              className={
                answer.aId === activeClass
                  ? "answer_containerSelect activeAnswer"
                  : "answer_containerSelect"
              }
              key={answer.aId}
              onClick={(e) => {
                compare(answer.aId, question._id);
                setactiveClass(answer.aId);
                removeClass(e.target);
              }}
            >
              {" "}
              {answer.answer}
            </li>
          ))}
      </ul>

      <div className="answer_sectionMatching">
        {question.questionType === "Matching Words" && (
          <div className="create_answerMatchingAns">
            {question.answers?.map(({ idx, text }, inx) => (
              <div className="matchingAnsItem" key={inx}>
                <b>{idx}:</b>
                {text.trim()}
              </div>
            ))}
          </div>
        )}

        <div className="answerSectionMatchingQues">
    
          {question.questionType === "Matching Words" && (
            <div className="inputAnswerContainerExternal">
              <div key={v4()} className="inputAnswerContainerInternal">
                <span>
                  <b>{question.questions[0] && question.questions[0].idx}. </b>
                  {question.questions[0] && question.questions[0].text}
                </span>
              {/* <h1>{idxAns.ans1}</h1> */}
                <select
                  value={idxAns.ans1}
                  onChange={(e) =>{
                    setIdxAns({ ...idxAns, ans1: e.target.value })
                    onChangeHandler(question.answers)
                  }
                  }
                >
                  <option value="">choice</option>
                  {question.answers.map(({ idx }) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  ))}
                </select>
              </div>
              <div
                key={v4()}
                className="inputAnswerContainerInternal"
                style={{
                  display: length >= 2 ? "flex" : "none",
                }}
              >
                <span>
                  <b>{question.questions[1] && question.questions[1].idx}. </b>
                  {question.questions[1] && question.questions[1].text}
                </span>

                <select
                  value={idxAns.ans2}
                  onChange={(e) =>{
                    setIdxAns({ ...idxAns, ans2: e.target.value })
                    onChangeHandler();
                  }
                  }

                >
                  <option value="">choice</option>
                  {question.answers.map(({ idx }) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  ))}
                </select>
              </div>
              <div
                key={v4()}
                className="inputAnswerContainerInternal"
                style={{
                  display: length >= 3 ? "flex" : "none",
                }}
              >
                <span>
                  <b>{question.questions[2] && question.questions[2].idx}. </b>
                  {question.questions[2] && question.questions[2].text}
                </span>
                <select
                  value={idxAns.ans3}
                  onChange={(e) =>{
                    setIdxAns({ ...idxAns, ans3: e.target.value })
                    onChangeHandler()
                  }
                  }
                >
                  <option value="">choice</option>
                  {question.answers.map(({ idx }) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  ))}
                </select>
              </div>
              <div
                key={v4()}
                className="inputAnswerContainerInternal"
                style={{
                  display: length >= 4 ? "flex" : "none",
                }}
              >
                <span>
                  <b>{question.questions[3] && question.questions[3].idx}. </b>
                  {question.questions[3] && question.questions[3].text}
                </span>
                <select
                  value={idxAns.ans4}
                  onChange={(e) =>{
                    setIdxAns({ ...idxAns, ans4: e.target.value })
                    onChangeHandler()
                  }
                  }
                >
                  <option value="">choice</option>
                  {question.answers.map(({ idx }) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  ))}
                </select>
              </div>
              <div
                key={v4()}
                className="inputAnswerContainerInternal"
                style={{
                  display: length >= 5 ? "flex" : "none",
                }}
              >
                <span>
                  <b>{question.questions[4] && question.questions[4].idx}. </b>
                  {question.questions[4] && question.questions[4].text}
                </span>
                <select
                  value={idxAns.ans5}
                  onChange={(e) =>{
                    setIdxAns({ ...idxAns, ans5: e.target.value })
                    onChangeHandler()
                  }
                  }
                >
                  <option value="">choice</option>
                  {question.answers.map(({ idx }) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  ))}
                </select>
              </div>
              <div
                key={v4()}
                className="inputAnswerContainerInternal"
                style={{
                  display: length >= 6 ? "flex" : "none",
                }}
              >
                <span>
                  <b>{question.questions[5] && question.questions[5].idx}. </b>
                  {question.questions[5] && question.questions[5].text}
                </span>
                <select
                  value={idxAns.ans6}
                  onChange={(e) =>{
                    setIdxAns({ ...idxAns, ans6: e.target.value })
                    onChangeHandler()
                  }
                  }
                >
                  <option value="">choice</option>
                  {question.answers.map(({ idx }) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  ))}
                </select>
              </div>
              <div
                key={v4()}
                className="inputAnswerContainerInternal"
                style={{
                  display: length >= 7 ? "flex" : "none",
                }}
              >
                <span>
                  <b>{question.questions[6] && question.questions[6].idx}. </b>
                  {question.questions[6] && question.questions[6].text}
                </span>
                <select
                  value={idxAns.ans7}
                  onChange={(e) =>{
                    setIdxAns({ ...idxAns, ans7: e.target.value })
                    onChangeHandler()
                  }
                  }
                >
                  <option value="">choice</option>
                  {question.answers.map(({ idx }) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  ))}
                </select>
              </div>
              <div
                key={v4()}
                className="inputAnswerContainerInternal"
                style={{
                  display: length >= 8 ? "flex" : "none",
                }}
              >
                <span>
                  <b>{question.questions[7] && question.questions[7].idx}. </b>
                  {question.questions[7] && question.questions[7].text}
                </span>
                <select
                  value={idxAns.ans8}
                  onChange={(e) =>{
                    setIdxAns({ ...idxAns, ans8: e.target.value })
                    onChangeHandler()
                  }
                  }
                >
                  <option value="">choice</option>
                  {question.answers.map(({ idx }) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerSection;
