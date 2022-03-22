// __tests__/fetch.test.js
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

const server = setupServer(
  rest.get("http://localhost:4000/questions", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 0,
          text: "Question 1?",
          answers: [
            { text: "answer 1.", score: 1 },
            { text: "answer 2.", score: -1 },
          ],
        },
        {
          id: 1,
          text: "Question 2?",
          answers: [
            { text: "answer 1.", score: 1 },
            { text: "answer 2.", score: -1 },
          ],
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays questions", async () => {
  render(<App />);

//   fireEvent.click(screen.getByText("Loading the quiz"));

  await waitFor(() => screen.findByRole("heading", {level: 2}));

  expect(screen.getByRole("heading", {level: 2})).toHaveTextContent("Question 1?");
  expect(screen.getByRole("list")).toHaveTextContent("answer 1.");
  expect(screen.getByText("Previous")).toBeDisabled();
  expect(screen.getByText("Next")).toBeDisabled();
});

test("Answering Question", async () => {
    render(<App />);
  
    await waitFor(() => screen.findByRole("heading", {level: 2}));

    fireEvent.click(screen.getAllByRole("listitem")[0]);
  
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("selected");
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeEnabled();
    expect(screen.queryByText("Show Result")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Next"));

    expect(screen.getByRole("heading", {level: 2})).toHaveTextContent("Question 2?");
    expect(screen.getAllByRole("listitem")[0]).not.toHaveClass("selected");
    expect(screen.getByText("Previous")).toBeEnabled();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
    expect(screen.getByText("Show Result")).toBeInTheDocument();
    expect(screen.getByText("Show Result")).toBeDisabled();
  });
