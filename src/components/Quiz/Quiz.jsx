import { useContext } from "react";
import { nanoid } from "nanoid";

import questions from "../../const/questions";
import { QuizContext } from "../../context/QuizContext";

import css from "./Quiz.module.css";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import SingleAnswerQuiz from "../SingleAnswerQuiz/SingleAnswerQuiz";
import MultipleAnswerQuiz from "../MultipleAnswerQuiz/MultipleAnswerQuiz";

const Quiz = () => {
  const {
    score,
    currentQuestion,
    selectedAnswers,
    setScore,
    setCurrentQuestion,
    setSelectedAnswers,
    resetQuiz,
  } = useContext(QuizContext);

  const handleAnswer = () => {
    const question = questions[currentQuestion];
    const isCorrect = question.multipleAnswers
      ? checkMultipleAnswer(question)
      : checkSingleAnswer(question);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    clearAndMoveToNextQuestion();
  };

  const checkSingleAnswer = (question) =>
    question.correctAnswers.every((answer) => selectedAnswers.includes(answer));

  const checkMultipleAnswer = (question) => {
    const sortedCorrectAnswers = [...question.correctAnswers].sort();
    const sortedSelectedAnswers = [...selectedAnswers].sort();

    return (
      sortedCorrectAnswers.length === sortedSelectedAnswers.length &&
      sortedCorrectAnswers.every((answer) =>
        sortedSelectedAnswers.includes(answer)
      )
    );
  };

  const clearAndMoveToNextQuestion = () => {
    setSelectedAnswers([]);
    setCurrentQuestion(currentQuestion + 1);
  };
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

  const renderAnswers = () => {
    const question = questions[currentQuestion];

    return question.answers.map((answer) =>
      question.multipleAnswers ? (
        <MultipleAnswerQuiz
          key={nanoid()}
          onChecked={selectedAnswers.includes(answer)}
          onChange={handleChange}
          answerItem={answer}
        />
      ) : (
        <SingleAnswerQuiz
          key={nanoid()}
          answerItem={answer}
          onChange={handleRadioChange}
          selectedValue={selectedAnswers}
        />
      )
    );
  };
  if (currentQuestion >= questions.length) {
    return (
      <div className={css.tryAgainWrapper}>
        <h1>
          Your scores: {score} out of {questions.length}
        </h1>
        <ButtonCustom onClick={resetQuiz} variant="outlined">
          Try again
        </ButtonCustom>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isMultipleAnswer = question.multipleAnswers;

  return (
    <div className={css.container}>
      <h1 className={css.mainTitle}>Question {currentQuestion + 1}</h1>
      <h2 className={css.question}>{question.question}</h2>
      <form className={css.answersWrapper}>{renderAnswers()}</form>
      {isMultipleAnswer && (
        <p className={css.notice}>* Select all that apply</p>
      )}
      <ButtonCustom onClick={handleAnswer} variant="contained">
        Answer
      </ButtonCustom>
    </div>
  );
};

export default Quiz;
