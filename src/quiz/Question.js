import styled from "styled-components";
import Answer from "./Answer";

const Wrap = styled.div`
  display: none;
  &.active {
    display: block;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      padding: 10px;
      margin: 10px;
      border: #ccc 1px solid;
      max-width: 600px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
      &.selected {
        border-color: #666;
        background-color: burlywood;
        color: white;
      }
    }
  }
`;

function Question({ question, active, handleAnswer, answer }) {
  return (
    <Wrap className={active ? "active" : null}>
      <h2>{question.text}</h2>
      <ul>
        {question.answers.map((a, i) => (
          <li
            key={i}
            onClick={() => handleAnswer(i)}
            className={
              Number.isInteger(answer) && answer === i ? "selected" : null
            }
          >
            <Answer answer={a} bullet={String.fromCharCode(65 + i)} />
          </li>
        ))}
      </ul>
    </Wrap>
  );
}

export default Question;
