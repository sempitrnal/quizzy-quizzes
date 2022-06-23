import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Choice from './Choice';
import { nanoid } from 'nanoid';
import Question from './Question';
function QuizItem({ question, choices, onClick, setQuizItem, isDone }) {
  return (
    <div className="flex flex-col justify-center items-center p-6 shadow-md rounded-lg mb-10 w-[50rem]">
      <Question question={question} key={question.id} />

      <div className="flex gap-5">
        {choices.map((choice) => {
          return (
            <Choice
              isDone={isDone}
              id={choice.id}
              isCorrect={choice.isCorrect}
              isClicked={choice.isClicked}
              choice={choice.answer}
              onClick={isDone ? null : onClick}
              key={choice.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default QuizItem;
