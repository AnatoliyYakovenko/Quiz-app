import { QuizProvider } from "./context/QuizContext";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  return (
    <div className="App">
      <QuizProvider>
        <Quiz />
      </QuizProvider>
    </div>
  );
}

export default App;
