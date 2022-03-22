import { BrowserRouter, Routes, Route } from "react-router-dom";
import Questions from "./quiz/Questions";
import Result from "./quiz/Result";

function NoMatch() {
  return (
    <main style={{ padding: "1rem" }}>
      <p>There's nothing here!</p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <h1>Are you an introvert or an extrovert?</h1>
          <Routes>
            <Route index element={<Questions />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
