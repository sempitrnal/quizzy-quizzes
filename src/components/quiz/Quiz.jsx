import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import QuizItem from "./QuizItem";

import Loader from "../Loader";
import { nanoid } from "nanoid";
import Results from "./Results";
import { IoMdArrowRoundBack } from "react-icons/io";

function Quiz({ quizDetails, back }) {
  const [openResults, setOpenResults] = useState(false);
  const close = () => setOpenResults(false);
  const open = () => {
    setOpenResults(true);
  };
  const [isDone, setIsDone] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [quizItem, setQuizItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizResults, setQuizResults] = useState({
    score: 0,
  });
  useEffect(() => {
    getQuiz();
  }, []);
  const getQuiz = async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${quizDetails.numOfQuestions}${
        quizDetails.category ? "&category=" : ""
      }${quizDetails.category}${quizDetails.difficulty ? "&difficulty=" : ""}${
        quizDetails.difficulty
      }`
    );
    const data = await res.json();
    setQuiz(data.results);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };
  useEffect(() => {
    if (!isLoading) {
      const done = quizItem.every((e) => e.isDone);

      if (done) {
        setIsDone(true);
        setOpenResults(true);
        const res = quizItem.filter((e) => e.isCorrect);
        setQuizResults({ score: res.length });
      } else {
        setIsDone(false);
      }
    }
  }, [isLoading, quizItem]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  useEffect(() => {
    let choiceArr = [];
    let choices = [];
    for (var i = 0; i < quiz.length; i++) {
      for (var j = 0; j < quiz[i].incorrect_answers.length; j++) {
        choices.push({
          id: nanoid(),
          answer: quiz[i].incorrect_answers[j],
          isCorrect: false,
          isClicked: false,
        });
      }
      choices.push({
        id: nanoid(),
        answer: quiz[i].correct_answer,
        isCorrect: true,
        isClicked: false,
      });
      shuffle(choices);
      choiceArr.push({
        id: nanoid(),
        question: quiz[i].question,
        choices: choices,
        isDone: false,
        isCorrect: false,
      });
      choices = [];
    }

    setQuizItem(choiceArr);
  }, [quiz]);

  const dropIn = {
    hidden: {
      opacity: 0,
      y: "-10vh",
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        damping: 10,
        delay: 0.4,
      },
    },
  };
  const fadeIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        damping: 10,
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const klik = (check, event) => {
    const { id } = event.target;

    let newArr = [];
    let newChoiceArr = [];
    quizItem.forEach((e) => {
      if (e.id === check) {
        for (var i = 0; i < e.choices.length; i++) {
          const current = e.choices[i];
          if (current.id === id) {
            newChoiceArr.push({ ...current, isClicked: true });
          } else {
            newChoiceArr.push(current);
          }
        }
        let answer = newChoiceArr.find((e) => e.isClicked);
        console.log(answer);
        newArr.push({
          ...e,
          choices: newChoiceArr,
          isDone: true,
          isCorrect: answer.isCorrect,
        });
      } else {
        return newArr.push(e);
      }
    });

    setQuizItem(newArr);
  };
  const quizSesh = quizItem.map((e) => {
    return (
      <QuizItem
        question={e.question}
        choices={e.choices}
        key={e.id}
        onClick={(event) => klik(e.id, event)}
        isDone={e.isDone}
      />
    );
  });
  const newQuiz = () => {
    setIsLoading(true);
    getQuiz();
    setOpenResults(false);
    setIsDone(false);
    setQuizResults({ score: 0 });
  };
  return (
    <motion.div exit={{ opacity: 0 }} className="min-w-full min-h-full">
      <div className="absolute">
        <AnimatePresence>
          {isLoading && <Loader variants={fadeIn} />}
        </AnimatePresence>
      </div>
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ backgroundColor: "#434a6e" }}
          whileTap={{ scale: 0.9 }}
        >
          <IoMdArrowRoundBack
            className="text-4xl fixed top-[7.5rem] left-4 cursor-pointer"
            onClick={back}
          />
        </motion.div>
      )}
      {!isLoading && (
        <motion.div
          className="mb-[5rem] sticky top-0 bg-white z-10 p-5 left-0 shadow-md
          flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="">
            <h1 className="text-xs lg:text-lg text-[#bfc4dc] font-semibold font-[Inter]">
              Quiz Difficulty
            </h1>
            <p className="text-md lg:text-2xl text-[#293264] font-bold font-[Inter] capitalize">
              {quiz[0].difficulty}
            </p>
          </div>
          <div className="text-end">
            <h1 className="text-xs lg:text-lg text-[#bfc4dc] font-semibold font-[Inter]">
              Quiz Category
            </h1>
            <p className="text-md lg:text-2xl text-[#293264] font-bold font-[Inter] ">
              {quiz[0].category}
            </p>
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {!isLoading && (
          <div className="flex text-center justify-center">
            <motion.div
              variants={dropIn}
              animate="visible"
              initial="hidden"
              className="flex flex-col gap-10"
            >
              {quizSesh}
              {isDone && (
                <motion.button
                  whileHover={{ backgroundColor: "#70789f" }}
                  whileTap={{ scale: 0.8 }}
                  onClick={open}
                  className="bg-[#4D5B9E] text-white font-[Inter] font-semibold w-[10rem] mb-20
                h-[3rem] mx-auto rounded-md"
                >
                  Open Results
                </motion.button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openResults && (
          <Results
            handleClick={close}
            results={quizResults}
            quizLength={quizItem.length}
            newQuiz={newQuiz}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Quiz;
