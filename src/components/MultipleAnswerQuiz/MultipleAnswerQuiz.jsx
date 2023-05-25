import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { nanoid } from 'nanoid'

export default function MultipleAnswerQuiz({answerItem, onChange, onChecked}) {

  return (
   <div>
    <FormControlLabel key={nanoid()}
      control={
        <Checkbox
          checked={onChecked}
          onChange={onChange}
          value={answerItem}
        />
      }
      label={answerItem}
    />
      </div>
  );
}