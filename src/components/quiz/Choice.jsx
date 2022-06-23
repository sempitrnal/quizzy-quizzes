import React from "react";

function Choice({ id, choice, onClick, isClicked, isCorrect, isDone }) {
  const style = {
    backgroundColor:
      isClicked && isCorrect && isDone
        ? "#84e4a6"
        : isClicked && !isCorrect && isDone
        ? "#f55a5a"
        : isCorrect && isDone
        ? "#84e4a6"
        : "",
  };
  return (
    <div>
      <p
        className="text-gray-800 cursor-pointer transition-all duration-300 p-3 rounded-md font-[Inter] font-medium border-[#293264] border hover:bg-[#f9f9f9]"
        onClick={onClick}
        id={id}
        style={style}
        dangerouslySetInnerHTML={{ __html: choice }}
      ></p>
    </div>
  );
}

export default Choice;
