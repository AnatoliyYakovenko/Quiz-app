import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./redux/slice";

import Quiz from "./components/Quiz/Quiz";
import "./App.css";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Quiz />
      </div>
    </Provider>
  );
}

export default App;
