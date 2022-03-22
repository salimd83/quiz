import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const [score, setScore] = useState(null);
  const results = JSON.parse(searchParams.get("answers"));

  useEffect(() => {
    if (!results) navigate("/");
    else
      (async () => {
        const res = await fetch("http://localhost:4000/questions");
        const questions = await res.json();
        setScore(
          questions.reduce((acc, q, i) => acc + q.answers[results[i]].score, 0)
        );
      })();
  }, [navigate, results]);

  return <p>Results: {score}</p>;
}

export default Result;
