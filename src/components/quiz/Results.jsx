import React, { useState } from 'react';
import Backdrop from './Backdrop';
import { AnimatePresence, motion } from 'framer-motion';
import Confetti from 'react-confetti';
function Results({ handleClick, results, quizLength, newQuiz }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const good =
    results.score >= Math.floor(quizLength / 3) &&
    results.score <= Math.floor(quizLength / 2);
  const great =
    results.score >= Math.floor(quizLength / 3) &&
    results.score <= Math.floor(quizLength / 2);
  const dropIn = {
    hidden: {
      y: '-10vh',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
      },
    },
  };
  setTimeout(() => {
    setShowConfetti(false);
  }, 3000);
  return (
    <Backdrop onClick={handleClick}>
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.stopPropagation()}
        className="w-[30%] h-[50%] bg-white rounded-xl flex  flex-col overflow-hidden"
      >
        <AnimatePresence>
          {showConfetti && (
            <motion.div className="" exit={{ opacity: 0 }}>
              <Confetti
                drawShape={(ctx) => {
                  ctx.beginPath();
                  for (let i = 0; i < 22; i++) {
                    const angle = 0.35 * i;
                    const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                    const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                    ctx.lineTo(x, y);
                  }
                  ctx.stroke();
                  ctx.closePath();
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <h1 className="text-4xl font-[Inter] font-semibold text-[#293264] m-5">
          {results.score >= 3 && results.score <= 5
            ? 'Great!'
            : results.score > 5 && results.score <= 8
            ? 'Well done!'
            : results.score === quizLength
            ? 'Excellent!'
            : 'Shahaahaha!'}
        </h1>
        <hr />
        <div className="h-full flex flex-col justify-center items-center">
          <p className="mb-2 text-center text-2xl font-[Inter] font-medium">
            you scored {results.score}/{quizLength}
          </p>
          <p className="mb-10 text-center text-lg font-[Inter] font-medium text-[#464b67]"></p>
          <button
            className="w-[8rem] h-[2.5rem] rounded-md bg-[#293264] text-white font-[Inter] font-medium"
            onClick={newQuiz}
          >
            New quiz
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default Results;
