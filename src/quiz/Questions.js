import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Question from "./Question";

function Questions() {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(new Array(5));
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
  const increase = () => setIndex((i) => ++i);
  const decrease = () => setIndex((i) => --i);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:4000/questions");
      setQuestions(await res.json());
    })();

    return () => setQuestions(null);
  }, []);

  function handleAnswer(answerIndex) {
      console.log(answerIndex)
    setAnswers((a) => {
      a[index] = answerIndex;
      return [...a];
    });
  }

  const toResult = () => navigate("/result?answers=[" + answers + "]");

  function navigation() {
    const hasAnswer = Number.isInteger(answers[index]);
    const isLastQues = index < questions.length - 1;

    return (
      <>
        <button disabled={index <= 0} onClick={decrease}>
          Previous
        </button>
        {isLastQues ? (
          <button disabled={!hasAnswer} onClick={increase}>
            Next
          </button>
        ) : (
          <button disabled={!hasAnswer} onClick={toResult}>
            Show Result
          </button>
        )}
      </>
    );
  }

  if (!questions) return <p>Loading the quiz</p>;

  if (!questions?.length)
    return <p>Unable to fetch the quiz, try relaoding the page.</p>;

  return (
    <>
      {questions.map((q, i) => (
        <Question
          role="question"
          key={q.id}
          active={index === i ? true : false}
          question={q}
          handleAnswer={handleAnswer}
          answer={answers[i]}
        />
      ))}
      {navigation()}
    </>
  );
}

export default Questions;
