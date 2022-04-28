import React from 'react';
import './Congrats.css';
import Confetti from "react-confetti";
import greet from "./greet.js";
import { Link } from 'react-router-dom';

const GreetingMessage = greet("Congratulations");

const Congrats = () => {
  return (
    <div className="congrats">
      <h1 >{GreetingMessage}</h1>
      <h2>Results will be announced in <a rel="noreferrer" target="_blank" href="https://t.me/NamanganLSL">LSL Telegram Group</a></h2>
      <p>You finished the test.</p>
      <Link className="congrats__link" to="/">Go to Home Page</Link>
      <Confetti />
    </div>
  )
}

export default Congrats
