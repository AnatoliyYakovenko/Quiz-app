import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  score: 0,
  currentQuestion: 0,
  selectedAnswers: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setScore(state, action) {
      state.score = action.payload;
    },
    setCurrentQuestion(state, action) {
      state.currentQuestion = action.payload;
    },
    setSelectedAnswers(state, action) {
      state.selectedAnswers = action.payload;
    },
    resetQuiz(state) {
      state.score = 0;
      state.currentQuestion = 0;
      state.selectedAnswers = [];
    },
  },
});

export const {
  setScore,
  setCurrentQuestion,
  setSelectedAnswers,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
