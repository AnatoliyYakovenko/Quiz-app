import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import css from "./MultipleAnswerQuiz.module.css";

export default function MultipleAnswerQuiz({
  answerItem,
  onChange,
  onChecked,
}) {
  return (
    <div className={css.multipleContainer}>
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
