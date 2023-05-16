import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  //   const incrementScore = () => {
  //     setScore(score + 1);
  //   };

  //   const nextQuestion = () => {
  //     setCurrentQuestion(currentQuestion + 1);
  //   };

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
      //   value={{
      //     score,
      //     currentQuestion,
      //     incrementScore,
      //     nextQuestion,
      //     resetQuiz,
      //   }}
    >
      {children}
    </QuizContext.Provider>
  );
};
