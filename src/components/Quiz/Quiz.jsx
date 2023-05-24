
import { useContext } from 'react';
import { Button } from '@mui/material';
import questions from '../../consts/questions';
import { QuizContext } from '../../context/QuizContext';
import ErrorRadios from '../RadioButtonList/RadioButtonList'

import css from './Quiz.module.css';
import CheckBoxList from '../CheckBoxList/CheckBoxList';

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

  const handleSingleAnswer =()=>{
    const correctAnswers = questions[currentQuestion].correctAnswers;

    const isCorrect = correctAnswers.every((answer) =>
    selectedAnswers.includes(answer));

    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedAnswers([]);
    setCurrentQuestion(currentQuestion + 1);
  };
 

  const handleAnswer = () => {
    const correctAnswers = questions[currentQuestion].correctAnswers;
    const sortedCorrectAnswers = correctAnswers.slice().sort();
    const sortedSelectedAnswers = selectedAnswers.slice().sort();

    const isCorrect = sortedCorrectAnswers.some((answer) =>
    sortedSelectedAnswers.includes(answer)&&sortedSelectedAnswers.length===sortedCorrectAnswers);
console.log(sortedCorrectAnswers);
console.log(sortedSelectedAnswers);
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

    const handleRadioChange = (event) => {
      setSelectedAnswers(event.target.value);
    };

    return questions[currentQuestion].answers.map((answer) => {
      if (questions[currentQuestion].multipleAnswers) {
        return (
          <CheckBoxList
          onChecked= {selectedAnswers.includes(answer)}
          onChange={handleChange}
          answerItem={answer}
          />
        );
      } else {
        return (
          <ErrorRadios
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
        <h1>Кількість балів: {score}</h1>
        <Button 
        type ="button"
        onClick={resetQuiz}
        className={css.submitBtn}
        variant="outlined" 
        // disabled={!isEnableSubmit}
        >Почати знову</Button>
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
      <Button 
        type ="button"
        onClick={handleAnswer}
        className={css.submitBtn}
        variant="contained" 
        // disabled={!isEnableSubmit}
        >Відповісти</Button>
      {/* <button onClick={handleAnswer}>Відповісти</button> */}
<p>Кількість балів: {score}</p>
</div>
);
};

export default Quiz;
