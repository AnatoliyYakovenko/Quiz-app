import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { nanoid } from 'nanoid'

export default function CheckBoxList({answerItem, onChange, onChecked}) {

  return (
   <div>
    <FormControlLabel
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