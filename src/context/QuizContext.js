import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
  };
  const contextValue = {
    score,
    currentQuestion,
    selectedAnswers,
    setScore,
    setCurrentQuestion,
    setSelectedAnswers,
    resetQuiz,
  };

  return (
    <QuizContext.Provider
      value={contextValue}
     >
      {children}
    </QuizContext.Provider>
  );
};
