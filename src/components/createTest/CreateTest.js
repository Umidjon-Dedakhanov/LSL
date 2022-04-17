import React, { useState, useEffect, useRef } from "react";
import "./CreateTest.css";
import { v4 as uuidv4 } from "uuid";
import axios from "../../api/create-test";
import usePreventLeave from "../../before-onload/BeforeUnload";

function CreateTest() {
  const [allDatas, setAllDatas] = useState([]);
  const [isMatchingTest, setIsMatching] = useState(false);

  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [questions, setQuestions] = useState({
    text0: "",
    text1: "",
    text2: "",
    text3: "",
    text4: "",
    text5: "",
    text6: "",
    text7: "",
  });
  const [answersText, setAnswersText] = useState({
    text0: "",
    text1: "",
    text2: "",
    text3: "",
    text4: "",
    text5: "",
    text6: "",
    text7: "",
  });
  const [pairs, setPairs] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });

  const [answer, setAnswer] = useState({
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
  });
  const [radio, setRadio] = useState({
    rad1: false,
    rad2: false,
    rad3: false,
    rad4: false,
  });

  const [data, setData] = useState([]);
  const [matchingData, setMatchingData] = useState([]);
  const [updateID, setUpdataID] = useState("");

  useEffect(() => {
    axios
      .get("multiple")
      .then((data) => setData(data.data))
      .catch(() => console.log("yoq"));
  }, []);

  useEffect(() => {
    axios
      .get("matching")
      .then((data) => setMatchingData(data.data))
      .catch(() => console.log("yoq"));
  }, []);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem("react-notes-questions")
    );
    if (savedNotes) setData(savedNotes);
  }, []);

  useEffect(() => {
    const savedMachtingtestss = JSON.parse(
      localStorage.getItem("MatchingDatas")
    );
    if (savedMachtingtestss) setMatchingData(savedMachtingtestss);
  }, []);

  useEffect(() => {
    const allDaata = JSON.parse(localStorage.getItem("AllDatas"));
    if (allDaata) setAllDatas(allDaata);
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-questions", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("MatchingDatas", JSON.stringify(matchingData));
  }, [matchingData]);

  useEffect(() => {
    localStorage.setItem("AllDatas", JSON.stringify(allDatas));
  }, [allDatas]);

  const { enablePrevent } = usePreventLeave();

  enablePrevent();
  // removePrevent()

  useEffect(() => {
    if (data && matchingData) {
      let matchedAndFixedData = [];
      matchingData.forEach((i) => {
        let newArray = [];
        for (let k = 0; k < i.questions.length; k++) {
          let ques = i.questions[k];
          let answ = i.answers[k];
          let temp = {
            quesIDX: ques.idx,
            quesText: ques.text,
            ansIDX: answ.idx,
            ansText: answ.text,
          };
          if (ques.text.length) {
            newArray.push(temp);
          }
        }

        let obj = {
          AnswerSheetPair: i.AnswerSheetPair,
          answers: i.answers,
          createdAt: i.createdAt,
          qId: i.qId,
          question: i.question,
          questionType: i.questionType,
          questions: i.questions,
          questionsAndAnswer: newArray,
        };
        matchedAndFixedData.push(obj);
      });
      let arr = [...matchedAndFixedData, ...data];
      arr = arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      setAllDatas(arr);
    }
  }, [data, matchingData]);

  // Scrolling To End
  const ScrollingTillTheEnd = useRef();
  useEffect(() => {
    if (ScrollingTillTheEnd.current) {
      ScrollingTillTheEnd.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  });
  // Scrolling To End

  const addMultipleTests = () => {
    setData((prev) => [...prev, createNewQuestion(uuidv4())]);
    setQuestion("");
    setAnswer({ ans1: "", ans2: "", ans3: "", ans4: "" });
    setRadio({ rad1: false, rad2: false, rad3: false, rad4: false });
  };

  const aditQuestion = (id) => {
    setUpdataID(id);
    let editQuestionAllDatas = allDatas.filter((i) => i.qId === id);
    setQuestion(editQuestionAllDatas[0].question);
    let type = editQuestionAllDatas[0].questionType;
    let setanswer = editQuestionAllDatas[0].answers;
    if (type === "Multiple Choice") {
      window.document.getElementById("mult").selected = true;
      setQuestionType("Multiple Choice");
      setIsMatching(false);
      setAnswer({
        ans1: setanswer[0].answer,
        ans2: setanswer[1].answer,
        ans3: setanswer[2] ? setanswer[2].answer : "",
        ans4: setanswer[3] ? setanswer[3].answer : "",
      });
      setRadio({
        rad1: setanswer[0].correct,
        rad2: setanswer[1].correct,
        rad3: setanswer[2] ? setanswer[2].correct : false,
        rad4: setanswer[3] ? setanswer[3].correct : false,
      });
    } else {
      window.document.getElementById("match").selected = true;
      setanswer = editQuestionAllDatas[0].questions;
      setQuestionType("Matching Words");
      setIsMatching(true);
      setQuestions({
        text0: setanswer[0].text,
        text1: setanswer[1].text,
        text2: setanswer[2].text,
        text3: setanswer[3].text,
        text4: setanswer[4].text,
        text5: setanswer[5].text,
        text6: setanswer[6].text,
        text7: setanswer[7].text,
      });
      setanswer = editQuestionAllDatas[0].answers;
      setAnswersText({
        text0: setanswer[0].text,
        text1: setanswer[1].text,
        text2: setanswer[2].text,
        text3: setanswer[3].text,
        text4: setanswer[4].text,
        text5: setanswer[5].text,
        text6: setanswer[6].text,
        text7: setanswer[7].text,
      });
      setanswer = editQuestionAllDatas[0].AnswerSheetPair.pairs;
      setPairs({
        1: setanswer[1],
        2: setanswer[2],
        3: setanswer[3],
        4: setanswer[4],
        5: setanswer[5],
        6: setanswer[6],
        7: setanswer[7],
        8: setanswer[8],
      });
    }

    let editQuestionData = data.filter((i) => i.qId === id);
    if (editQuestionData.length) {
      setQuestion(editQuestionData[0].question);
      let setanswer = editQuestionData[0].answers;
      setAnswer({
        ans1: setanswer[0].answer,
        ans2: setanswer[1].answer,
        ans3: setanswer[2] ? setanswer[2].answer : "",
        ans4: setanswer[3] ? setanswer[3].answer : "",
      });
      setRadio({
        rad1: setanswer[0].correct,
        rad2: setanswer[1].correct,
        rad3: setanswer[2] ? setanswer[2].correct : false,
        rad4: setanswer[3] ? setanswer[3].correct : false,
      });
    }

    let editQuestionMatchingData = matchingData.filter((i) => i.qId === id);
    if (editQuestionMatchingData.length) {
      window.document.getElementById("match").selected = true;
      setanswer = editQuestionMatchingData[0].questions;
      setQuestionType("Matching Words");
      setIsMatching(true);
      setQuestions({
        text0: setanswer[0].text,
        text1: setanswer[1].text,
        text2: setanswer[2].text,
        text3: setanswer[3].text,
        text4: setanswer[4].text,
        text5: setanswer[5].text,
        text6: setanswer[6].text,
        text7: setanswer[7].text,
      });
      setanswer = editQuestionMatchingData[0].answers;
      setAnswersText({
        text0: setanswer[0].text,
        text1: setanswer[1].text,
        text2: setanswer[2].text,
        text3: setanswer[3].text,
        text4: setanswer[4].text,
        text5: setanswer[5].text,
        text6: setanswer[6].text,
        text7: setanswer[7].text,
      });
      setanswer = editQuestionMatchingData[0].AnswerSheetPair.pairs;
      setPairs({
        1: setanswer[1],
        2: setanswer[2],
        3: setanswer[3],
        4: setanswer[4],
        5: setanswer[5],
        6: setanswer[6],
        7: setanswer[7],
        8: setanswer[8],
      });
    }
  };

  const updataQuestion = () => {
    let indexQuestionAllData = allDatas.findIndex((i) => i.qId === updateID);
    let type = allDatas[indexQuestionAllData].questionType;
    if (type === "Matching Words") {
      let indexQuestionMatchingData = matchingData.findIndex(
        (i) => i.qId === updateID
      );
      let time = matchingData[indexQuestionMatchingData].createdAt;
      matchingData.splice(
        indexQuestionMatchingData,
        1,
        createNewMatchingTest(updateID, time)
      );
      setMatchingData(matchingData);
      setQuestion("");
      setQuestions({
        text0: "",
        text1: "",
        text2: "",
        text3: "",
        text4: "",
        text5: "",
        text6: "",
        text7: "",
      });
      setAnswersText({
        text0: "",
        text1: "",
        text2: "",
        text3: "",
        text4: "",
        text5: "",
        text6: "",
        text7: "",
      });
      setPairs({
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
      });
      setUpdataID("");
      localStorage.setItem("MatchingDatas", JSON.stringify(matchingData));
      const savedMachtingtestss = JSON.parse(
        localStorage.getItem("MatchingDatas")
      );
      if (savedMachtingtestss) setMatchingData(savedMachtingtestss);
    } else {
      let indexQuestionData = data.findIndex((i) => i.qId === updateID);
      let time = data[indexQuestionData].createdAt;
      data.splice(indexQuestionData, 1, createNewQuestion(updateID, time));
      setData(data);
      setQuestion("");
      setAnswer({ ans1: "", ans2: "", ans3: "", ans4: "" });
      setRadio({ rad1: false, rad2: false, rad3: false, rad4: false });
      setUpdataID("");
      localStorage.setItem("react-notes-questions", JSON.stringify(data));
      const savedNotes = JSON.parse(
        localStorage.getItem("react-notes-questions")
      );
      if (savedNotes) setData(savedNotes);
    }
  };

  const deleteQuestion = (id) => {
    let indexQuestionALL = allDatas.findIndex((i) => i.qId === id);
    let indexQuestionTEST = data.findIndex((i) => i.qId === id);
    let indexQuestionMATCH = matchingData.findIndex((i) => i.qId === id);
    let type = allDatas[indexQuestionALL].questionType;
    // confirm to delete each question
    let CheckingAnswer = window.confirm(
      `Are you sure to delete "${indexQuestionALL + 1}. ${
        allDatas[indexQuestionALL].question
      }"`
    );
    if (!CheckingAnswer) return;
    if (type === "Multiple Choice") {
      data.splice(indexQuestionTEST, 1);
      setData(data);
      setRadio({ rad1: false, rad2: false, rad3: false, rad4: false });
      localStorage.setItem("react-notes-questions", JSON.stringify(data));
      const savedNotes = JSON.parse(
        localStorage.getItem("react-notes-questions")
      );
      if (savedNotes) setData(savedNotes);
    } else {
      matchingData.splice(indexQuestionMATCH, 1);
      setMatchingData(matchingData);
      localStorage.setItem("MatchingDatas", JSON.stringify(matchingData));
      const savedMachtingtestss = JSON.parse(
        localStorage.getItem("MatchingDatas")
      );
      if (savedMachtingtestss) setMatchingData(savedMachtingtestss);
    }
  };

  const pushData = () => {
    axios
      .post("multiple", data)
      .then(() => console.log("data is saved to mongodb"))
      .catch(() => console.log("data is not saved to mongodb"));
    // localStorage.removeItem("react-notes-questions");
    // setData([])
  };

  const pushAllDatas = () => {
    axios
      .post("allquestions", allDatas)
      .then(() => console.log("data is saved to mongodb"))
      .catch(() => console.log("data is not saved to mongodb"));
    localStorage.clear();
    // setData([])
  };

  function createNewQuestion(id, time) {
    let newQuestion = {
      qId: id,
      question,
      questionType: questionType,
      createdAt: time || new Date(),
      answers: [
        {
          aId: uuidv4(),
          answer: answer.ans1,
          correct: radio.rad1,
        },
        {
          aId: uuidv4(),
          answer: answer.ans2,
          correct: radio.rad2,
        },
        answer.ans3 && {
          aId: uuidv4(),
          answer: answer.ans3,
          correct: radio.rad3,
        },
        answer.ans4 && {
          aId: uuidv4(),
          answer: answer.ans4,
          correct: radio.rad4,
        },
      ],
    };
    newQuestion.answers = newQuestion.answers.filter((i) => i);
    return newQuestion;
  }

  const pushMatchingData = () => {
    axios
      .post("matching", matchingData)
      .then(() => console.log("data is saved to mongodb"))
      .catch(() => console.log("data is not saved to mongodb"));
    // localStorage.removeItem("MatchingDatas");
  };

  const handleToAddMatchingTests = () => {
    setMatchingData((prev) => [...prev, createNewMatchingTest(uuidv4())]);
    setQuestion("");
    setQuestions({
      text0: "",
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      text5: "",
      text6: "",
      text7: "",
    });
    setAnswersText({
      text0: "",
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      text5: "",
      text6: "",
      text7: "",
    });
    setPairs({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
  };

  const createNewMatchingTest = (id, time) => {
    let newMatchingTest = {
      qId: id,
      question,
      questionType,
      createdAt: time || new Date(),
      questions: [
        {
          selectID: uuidv4(),
          questionID: uuidv4(),
          idx: 1,
          text: questions.text0,
        },
        {
          selectID: uuidv4(),
          questionID: uuidv4(),
          idx: 2,
          text: questions.text1,
        },
        {
          selectID: uuidv4(),
          questionID: uuidv4(),
          idx: 3,
          text: questions.text2,
        },
        {
          selectID: uuidv4(),
          questionID: uuidv4(),
          idx: 4,
          text: questions.text3,
        },
        {
          selectID: uuidv4(),
          questionID: uuidv4(),
          idx: 5,
          text: questions.text4,
        },
        {
          selectID: uuidv4(),
          questionID: uuidv4(),
          idx: 6,
          text: questions.text5,
        },
        {
          selectID: uuidv4(),
          questionID: uuidv4(),
          idx: 7,
          text: questions.text6,
        },
        {
          selectID: uuidv4(),
          questionID: uuidv4(),
          idx: 8,
          text: questions.text7,
        },
      ],
      answers: [
        {
          selectID: uuidv4(),
          answerID: uuidv4(),
          idx: pairs[1],
          text: answersText.text0,
        },
        {
          selectID: uuidv4(),
          answerID: uuidv4(),
          idx: pairs[2],
          text: answersText.text1,
        },
        {
          selectID: uuidv4(),
          answerID: uuidv4(),
          idx: pairs[3],
          text: answersText.text2,
        },
        {
          selectID: uuidv4(),
          answerID: uuidv4(),
          idx: pairs[4],
          text: answersText.text3,
        },
        {
          selectID: uuidv4(),
          answerID: uuidv4(),
          idx: pairs[5],
          text: answersText.text4,
        },
        {
          selectID: uuidv4(),
          answerID: uuidv4(),
          idx: pairs[6],
          text: answersText.text5,
        },
        {
          selectID: uuidv4(),
          answerID: uuidv4(),
          idx: pairs[7],
          text: answersText.text6,
        },
        {
          selectID: uuidv4(),
          answerID: uuidv4(),
          idx: pairs[8],
          text: answersText.text7,
        },
      ],
      AnswerSheetPair: {
        ansID: uuidv4(),
        pairs: {
          1: pairs[1],
          2: pairs[2],
          3: pairs[3],
          4: pairs[4],
          5: pairs[5],
          6: pairs[6],
          7: pairs[7],
          8: pairs[8],
        },
      },
    };
    return newMatchingTest;
  };

  return (
    <div className="create_test">
      <div className="create_form">
        <div className="create_formChangingtype">
          <label htmlFor="testType">Choose Question Type: </label>
          <select
            name="testType"
            onChange={(e) => {
              setIsMatching(!isMatchingTest);
              setQuestionType(e.target.value);
            }}
            id="testType"
          >
            <option id="mult" value="Multiple Choice">
              Multiple Choice
            </option>
            <option id="match" value="Matching Words">
              Matching Words
            </option>
          </select>
        </div>

        <textarea
          className="create_questionText"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          name=""
          id=""
          cols="30"
          placeholder="Enter your question..."
          rows="10"
        ></textarea>
        {
          isMatchingTest?
          <div>
          <div className="create_collection">
            <span className="create_matching">
              <label style={{ marginRight: "5px" }}>1</label>
              <input
                value={questions.text0}
                onChange={(e) =>
                  setQuestions({ ...questions, text0: e.target.value })
                }
                type="text"
                placeholder="First Word..."
              />
              <input
                value={pairs[1]}
                onChange={(e) => setPairs({ ...pairs, 1: e.target.value })}
                style={{ width: "33px" }}
                type="text"
                placeholder="idx"
                maxLength="1"
              />
              <input
                value={answersText.text0}
                onChange={(e) =>
                  setAnswersText({ ...answersText, text0: e.target.value })
                }
                type="text"
                placeholder="Matching Word..."
              />
            </span>
            <span
              style={{ display: questions.text0.length ? "flex" : "none" }}
              className="create_matching"
            >
              <label style={{ marginRight: "5px" }}>2</label>
              <input
                value={questions.text1}
                onChange={(e) =>
                  setQuestions({ ...questions, text1: e.target.value })
                }
                type="text"
                placeholder="Second Word..."
              />
              <input
                value={pairs[2]}
                onChange={(e) => setPairs({ ...pairs, 2: e.target.value })}
                style={{ width: "33px" }}
                type="text"
                placeholder="idx"
                maxLength="1"
              />
              <input
                value={answersText.text1}
                onChange={(e) =>
                  setAnswersText({ ...answersText, text1: e.target.value })
                }
                type="text"
                placeholder="Matching Word..."
              />
            </span>
            <span
              style={{ display: questions.text1.length ? "flex" : "none" }}
              className="create_matching"
            >
              <label style={{ marginRight: "5px" }}>3</label>
              <input
                value={questions.text2}
                onChange={(e) =>
                  setQuestions({ ...questions, text2: e.target.value })
                }
                type="text"
                placeholder="Third Word..."
              />
              <input
                value={pairs[3]}
                onChange={(e) => setPairs({ ...pairs, 3: e.target.value })}
                style={{ width: "33px" }}
                type="text"
                placeholder="idx"
                maxLength="1"
              />
              <input
                value={answersText.text2}
                onChange={(e) =>
                  setAnswersText({ ...answersText, text2: e.target.value })
                }
                type="text"
                placeholder="Matching Word..."
              />
            </span>
            <span
              style={{ display: questions.text2.length ? "flex" : "none" }}
              className="create_matching"
            >
              <label style={{ marginRight: "5px" }}>4</label>
              <input
                value={questions.text3}
                onChange={(e) =>
                  setQuestions({ ...questions, text3: e.target.value })
                }
                type="text"
                placeholder="Fourth Word..."
              />
              <input
                value={pairs[4]}
                onChange={(e) => setPairs({ ...pairs, 4: e.target.value })}
                style={{ width: "33px" }}
                type="text"
                placeholder="idx"
                maxLength="1"
              />
              <input
                value={answersText.text3}
                onChange={(e) =>
                  setAnswersText({ ...answersText, text3: e.target.value })
                }
                type="text"
                placeholder="Matching Word..."
              />
            </span>
            <span
              style={{ display: questions.text3.length ? "flex" : "none" }}
              className="create_matching"
            >
              <label style={{ marginRight: "5px" }}>5</label>
              <input
                value={questions.text4}
                onChange={(e) =>
                  setQuestions({ ...questions, text4: e.target.value })
                }
                type="text"
                placeholder="Fifth Word..."
              />
              <input
                value={pairs[5]}
                onChange={(e) => setPairs({ ...pairs, 5: e.target.value })}
                style={{ width: "33px" }}
                type="text"
                placeholder="idx"
                maxLength="1"
              />
              <input
                value={answersText.text4}
                onChange={(e) =>
                  setAnswersText({ ...answersText, text4: e.target.value })
                }
                type="text"
                placeholder="Matching Word..."
              />
            </span>
            <span
              style={{ display: questions.text4.length ? "flex" : "none" }}
              className="create_matching"
            >
              <label style={{ marginRight: "5px" }}>6</label>
              <input
                value={questions.text5}
                onChange={(e) =>
                  setQuestions({ ...questions, text5: e.target.value })
                }
                type="text"
                placeholder="Sixth Word..."
              />
              <input
                value={pairs[6]}
                onChange={(e) => setPairs({ ...pairs, 6: e.target.value })}
                style={{ width: "33px" }}
                type="text"
                placeholder="idx"
                maxLength="1"
              />
              <input
                value={answersText.text5}
                onChange={(e) =>
                  setAnswersText({ ...answersText, text5: e.target.value })
                }
                type="text"
                placeholder="Matching Word..."
              />
            </span>
            <span
              style={{ display: questions.text5.length ? "flex" : "none" }}
              className="create_matching"
            >
              <label style={{ marginRight: "5px" }}>7</label>
              <input
                value={questions.text6}
                onChange={(e) =>
                  setQuestions({ ...questions, text6: e.target.value })
                }
                type="text"
                placeholder="Seventh Word..."
              />
              <input
                value={pairs[7]}
                onChange={(e) => setPairs({ ...pairs, 7: e.target.value })}
                style={{ width: "33px" }}
                type="text"
                placeholder="idx"
                maxLength="1"
              />
              <input
                value={answersText.text6}
                onChange={(e) =>
                  setAnswersText({ ...answersText, text6: e.target.value })
                }
                type="text"
                placeholder="Matching Word..."
              />
            </span>
            <span
              style={{ display: questions.text6.length ? "flex" : "none" }}
              className="create_matching"
            >
              <label style={{ marginRight: "5px" }}>8</label>
              <input
                value={questions.text7}
                onChange={(e) =>
                  setQuestions({ ...questions, text7: e.target.value })
                }
                type="text"
                placeholder="Eighth Word..."
              />
              <input
                value={pairs[8]}
                onChange={(e) => setPairs({ ...pairs, 8: e.target.value })}
                style={{ width: "33px" }}
                type="text"
                placeholder="idx"
                maxLength="1"
              />
              <input
                value={answersText.text7}
                onChange={(e) =>
                  setAnswersText({ ...answersText, text7: e.target.value })
                }
                type="text"
                placeholder="Matching Word..."
              />
            </span>
          </div>
          </div>
          :
          <div >
          <ul className="create_collection">
            <li className="create_collectionItem">
              <input
                checked={radio.rad1}
                onChange={(e) =>
                  setRadio({
                    rad1: e.target.checked,
                    rad2: false,
                    rad3: false,
                    rad4: false,
                  })
                }
                type="radio"
                name="answer"
              />
              <input
                type="text"
                value={answer.ans1}
                onChange={(e) => setAnswer({ ...answer, ans1: e.target.value })}
              />
            </li>
            <li
              style={
                answer.ans1.trim().length > 0
                  ? { display: "flex" }
                  : { display: "none" }
              }
              className="create_collectionItem"
            >
              <input
                checked={radio.rad2}
                onChange={(e) =>
                  setRadio({
                    rad1: false,
                    rad2: e.target.checked,
                    rad3: false,
                    rad4: false,
                  })
                }
                type="radio"
                name="answer"
              />
              <input
                type="text"
                value={answer.ans2}
                onChange={(e) => setAnswer({ ...answer, ans2: e.target.value })}
              />
            </li>
            <li
              style={
                answer.ans2.trim().length > 0
                  ? { display: "flex" }
                  : { display: "none" }
              }
              className="create_collectionItem"
            >
              <input
                checked={radio.rad3}
                onChange={(e) =>
                  setRadio({
                    rad1: false,
                    rad2: false,
                    rad3: e.target.checked,
                    rad4: false,
                  })
                }
                type="radio"
                name="answer"
              />
              <input
                type="text"
                value={answer.ans3}
                onChange={(e) => setAnswer({ ...answer, ans3: e.target.value })}
              />
            </li>
            <li
              style={
                answer.ans3.trim().length > 0
                  ? { display: "flex" }
                  : { display: "none" }
              }
              className="create_collectionItem"
            >
              <input
                checked={radio.rad4}
                onChange={(e) =>
                  setRadio({
                    rad1: false,
                    rad2: false,
                    rad3: false,
                    rad4: e.target.checked,
                  })
                }
                type="radio"
                name="answer"
              />
              <input
                type="text"
                value={answer.ans4}
                onChange={(e) => setAnswer({ ...answer, ans4: e.target.value })}
              />
            </li>
          </ul>
          </div>
        }
       

      
        <div className="create_formBtns">
          {updateID ? (
            <button
              className="create_updateBtn create_btn"
              onClick={updataQuestion}
            >
              Update
            </button>
          ) : isMatchingTest ? (
            <button
              className="create_addDataBtn create_btn"
              onClick={handleToAddMatchingTests}
            >
              Next question
            </button>
          ) : (
            <button
              disabled={question.length ? false : true}
              className="create_addDataBtn create_btn"
              onClick={addMultipleTests}
            >
              Next question
            </button>
          )}
          <button
            disabled={matchingData.length || data.length ? false : true}
            className="create_submitData create_btn"
            onClick={() => {
              pushMatchingData();
              pushData();
              pushAllDatas();
            }}
          >
            submit
          </button>
        </div>
      </div>

      <div className="create_container ">
        {allDatas &&
          allDatas.map((question, index) => (
            <div
              ref={ScrollingTillTheEnd}
              className="answer_container"
              key={question.qId}
            >
              <h3 className="create_answerTitle">
                {index + 1}. {question.question}
              </h3>
              <ul>
                {question.questionType === "Multiple Choice" ? (
                  question.answers &&
                  question.answers.map(({ answer, correct }, inx) => (
                    <li
                      className={
                        correct
                          ? "create_answers truth_answer"
                          : "create_answers"
                      }
                      key={inx}
                    >
                      {answer}
                    </li>
                  ))
                ) : (
                  <div className="create_answerMatching">
                      <div className="create_answerMatchingAns">
                        {question.questionsAndAnswer &&
                          question.questionsAndAnswer.map(
                            ({ ansIDX, ansText }, inx) => (
                              <div className="matchingAnsItem" key={inx}>
                                  <b>{ansIDX}:</b>
                                  {ansText.trim()}
                              </div>
                            )
                          )}
                      </div>
                      <div className="create_answerMatchingQues">
                        {question.questionsAndAnswer &&
                          question.questionsAndAnswer.map(
                            ({  quesIDX, quesText, ansIDX }, inx) => (
                              <div className="matchingQuesItem" key={inx}>
                                <div>
                                  <b>{quesIDX}:</b>
                                  <span>{quesText.trim()} </span>
                                </div>
                                <div className="matchingQuesItemAns"><span>{ansIDX}</span></div>
                              </div>
                            )
                          )}
                      </div>
                  </div>
                )}
              </ul>

              <div className="create_config">
                <button
                  className="create_configEdit"
                  onClick={() => aditQuestion(question.qId)}
                >
                  Edit
                </button>
                <button
                  className="create_configDelete"
                  onClick={() => deleteQuestion(question.qId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CreateTest;
