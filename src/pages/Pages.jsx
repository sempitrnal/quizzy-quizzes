
import React, { useState} from "react";
import Home from "../components/Home";
import Quiz from "../components/quiz/Quiz";
import {  AnimatePresence } from "framer-motion";

function Pages() {
  const [isQuiz, setIsQuiz] = useState(false);
  const startQuiz = () => {
    if (isNaN(setIsQuiz.numOfQuestions)) {
      setIsQuiz(!isQuiz);
    } else {
    }
  };
  const backHome = () => {
    setIsQuiz(!isQuiz);
  };
  const [quizDetails, setQuizDetails] = useState({
    category: "",
    difficulty: "",
    numOfQuestions: "",
  });



  return (
    <div className="flex flex-col justify-center items-center">
      <AnimatePresence>
        {!isQuiz && (
          <Home
            startQuiz={startQuiz}
            quizDetails={quizDetails}
            setQuizDetails={setQuizDetails}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isQuiz && <Quiz quizDetails={quizDetails} back={backHome} />}
      </AnimatePresence>
    </div>
  );
}

export default Pages;
