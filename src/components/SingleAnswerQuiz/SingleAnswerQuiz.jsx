import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { nanoid } from 'nanoid'

export default function SingleAnswerQuiz({answerItem, onChange, selectedValue}) {
  
  // const handleSingleAnswer =()=>{
  //   const isCorrect = quizCorrectAnswers.every((answer) =>
  //   selectedAnswers.includes(answer));

  //   if (isCorrect) {
  //     setScore(score + 1);
  //   }
  //   setSelectedAnswers([]);
  //   setCurrentQuestion(currentQuestion + 1);
  // };

  return (
   <div>
      <FormControl sx={{ m: 3 }} variant="standard">
      <FormLabel id="demo-error-radios"></FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={selectedValue}
          onChange={onChange}
        >
          <FormControlLabel key={nanoid()} value={answerItem} control={<Radio />} label={answerItem} />
        </RadioGroup>
      </FormControl>
    </div>
  );
}