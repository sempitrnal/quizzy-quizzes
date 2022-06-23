import Choice from "./Choice";
import Question from "./Question";

function QuizItem({ question, choices, onClick, setQuizItem, isDone }) {
  return (
    <div className="flex flex-col justify-center items-center p-6 shadow-md rounded-lg mb-10 w-[20rem] md:w-[40rem] lg:w-[50rem]">
      <Question question={question} key={question.id} />

      <div className="flex flex-col gap-5 md:flex-row">
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
