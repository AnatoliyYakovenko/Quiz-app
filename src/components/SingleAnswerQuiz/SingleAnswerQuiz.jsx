import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import css from "./SingleAnswerQuiz.module.css";

export default function SingleAnswerQuiz({
  answerItem,
  onChange,
  selectedValue,
}) {
  return (
    <div className={css.singleContainer}>
      <FormControl sx={{ m: 3 }} variant="standard">
        <FormLabel id="demo-error-radios"></FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={selectedValue}
          onChange={onChange}
        >
          <FormControlLabel
            value={answerItem}
            control={<Radio />}
            label={answerItem}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
