import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import { setScore, setCurrentQuestion, setSelectedAnswers, resetQuiz } from '../../redux/slice';

import { ButtonCustom } from '../ButtonCustom/ButtonCustom';
import SingleAnswerQuiz from '../SingleAnswerQuiz/SingleAnswerQuiz';
import MultipleAnswerQuiz from '../MultipleAnswerQuiz/MultipleAnswerQuiz';
import questions from '../../const/questions';

import css from './Quiz.module.css';

const Quiz = () => {
  const score = useSelector((state) => state.quiz.score);
  const currentQuestion = useSelector((state) => state.quiz.currentQuestion);
  const selectedAnswers = useSelector((state) => state.quiz.selectedAnswers);
  const dispatch = useDispatch();

  const handleAnswer = () => {
    const question = questions[currentQuestion];
    const isCorrect = question.multipleAnswers
      ? checkMultipleAnswer(question)
      : checkSingleAnswer(question);

    if (isCorrect) {
      dispatch(setScore(score + 1));
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
      sortedCorrectAnswers.every((answer) => sortedSelectedAnswers.includes(answer))
    );
  };

  const clearAndMoveToNextQuestion = () => {
    dispatch(setSelectedAnswers([]));
    dispatch(setCurrentQuestion(currentQuestion + 1));
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      dispatch(setSelectedAnswers([...selectedAnswers, value]));
    } else {
      dispatch(setSelectedAnswers(selectedAnswers.filter((answer) => answer !== value)));
    }
  };

  const handleRadioChange = (event) => {
    dispatch(setSelectedAnswers(event.target.value));
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
        <ButtonCustom onClick={() => dispatch(resetQuiz())} variant="outlined">
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
      {isMultipleAnswer && <p className={css.notice}>* Select all that apply</p>}
      <ButtonCustom onClick={handleAnswer} variant="contained">
        Answer
      </ButtonCustom>
    </div>
  );
};

export default Quiz;