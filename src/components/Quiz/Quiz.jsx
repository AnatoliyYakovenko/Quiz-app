
import { useContext } from 'react';

import questions from '../../const/questions';
import { QuizContext } from '../../context/QuizContext';

import css from './Quiz.module.css';
import { ButtonCustom } from '../ButtonCustom/ButtonCustom';
import SingleAnswerQuiz from '../SingleAnswerQuiz/SingleAnswerQuiz';
import MultipleAnswerQuiz from '../MultipleAnswerQuiz/MultipleAnswerQuiz';

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

  const handleMultipleAnswer = () => {
    const sortedCorrectAnswers = [
      ...questions[currentQuestion].correctAnswers,
    ].sort();
    const sortedSelectedAnswers = [...selectedAnswers].sort();
  
    const isCorrect = sortedCorrectAnswers.every(
      (answer) =>
        sortedSelectedAnswers.includes(answer) &&
        sortedSelectedAnswers.length === sortedCorrectAnswers.length
    );
    isCorrectAnswer(isCorrect);
    clearAndMoveToNextQuestion()
  };
  
  const handleSingleAnswer = () => {
    const isCorrect = questions[currentQuestion].correctAnswers.every((answer) =>
      selectedAnswers.includes(answer)
    );
    isCorrectAnswer(isCorrect);
    clearAndMoveToNextQuestion();
  };

const isCorrectAnswer =(isCorrect)=>{
  if (isCorrect) {
    setScore(score + 1);
  }
}
const clearAndMoveToNextQuestion = () => {
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

    const handleRadioChange = (event) => {
      setSelectedAnswers(event.target.value);
    };

    return questions[currentQuestion].answers.map((answer) => {
      if (questions[currentQuestion].multipleAnswers) {
        return (
          <MultipleAnswerQuiz
          onChecked= {selectedAnswers.includes(answer)}
          onChange={handleChange}
          answerItem={answer}
          />
        );
      } else {
        return (
          <SingleAnswerQuiz
          answerItem ={answer}
          onChange={handleRadioChange}
          selectedValue={selectedAnswers}
          />
        );
      }
    });
  };
  if (currentQuestion >= questions.length) {
    return (
      <div>
        <h1>Your scores: {score}</h1>
        <ButtonCustom
            onClick ={resetQuiz}
            variant="outlined"
            >Try again</ButtonCustom>
      </div>
    );
  }
  return (
    <div>
      <h1>Question {currentQuestion + 1}</h1>
      <h2>{questions[currentQuestion].question}</h2>
      <form>
        {renderAnswers()}
      </form>
      <ButtonCustom
      onClick ={questions[currentQuestion].multipleAnswers ? handleMultipleAnswer : handleSingleAnswer}
      variant="contained"
      >Answer</ButtonCustom>
</div>
);
};

export default Quiz;
