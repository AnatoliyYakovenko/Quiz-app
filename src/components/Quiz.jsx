
import React, { useContext } from 'react';
import questions from '../consts/questions';
import { QuizContext } from '../context/QuizContext';

const Quiz = () => {
  const {
    score,
    currentQuestion,
    selectedAnswers,
    setScore,
    setCurrentQuestion,
    setSelectedAnswers,
    resetQuiz
  } = useContext(QuizContext);

  const handleAnswer = () => {
    const correctAnswers = questions[currentQuestion].correctAnswers;

    const isCorrect = correctAnswers.every((answer) =>
      selectedAnswers.includes(answer)
    );

    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswers([]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const renderAnswers = () => {
    const handleChange = (e) => {
      const { value, checked } = e.target;

      if (checked) {
        setSelectedAnswers([...selectedAnswers, value]);
      } else {
        setSelectedAnswers(selectedAnswers.filter((answer) => answer !== value));
      }
    };

    return questions[currentQuestion].answers.map((answer) => {
      if (questions[currentQuestion].multipleAnswers) {
        return (
          <label key={answer}>
            <input
              type="checkbox"
              value={answer}
              checked={selectedAnswers.includes(answer)}
              onChange={handleChange}
            />
            {answer}
          </label>
        );
      } else {
        return (
          <label key={answer}>
            <input
              type="radio"
              value={answer}
              checked={selectedAnswers[0] === answer}
              onChange={handleChange}
            />
            {answer}
          </label>
        );
      }
    });
  };

  if (currentQuestion >= questions.length) {
    return (
      <div>
        <h1>Кількість балів: {score}</h1>
        <button onClick={resetQuiz}>Почати знову</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Питання {currentQuestion + 1}</h1>
      <h2>{questions[currentQuestion].question}</h2>
      <form>
        {renderAnswers()}
      </form>
      <button onClick={handleAnswer}>Відповісти</button>
<p>Кількість балів: {score}</p>
</div>
);
};

export default Quiz;
