import styles from "./App.module.css";
import Board from "../components/board/Board.tsx";
import Leaderboard from "../components/leaderboard/Leaderboard.tsx";

interface GameDataInterface {
  rows: number;
  cols: number;
}

interface Question {
  question: string;
  column: number;
  row: number;
  clicked?: boolean;
}

interface Questions {
  [key: string]: Question;
}

interface Category {
  [key: string]: string;
}

interface QuestionData {
  questions: Questions;
  category: Category;
}

function App() {
  const defaultGameRows = 6;
  const defaultGameCols = 6;

  //set up game data if it doesn't exist in local storage
  const generateCleanGameData = (): GameDataInterface => {
    return { rows: defaultGameRows, cols: defaultGameCols };
  };

  if (!localStorage.getItem("gameData")) {
    localStorage.setItem("gameData", JSON.stringify(generateCleanGameData()));
  }

  const gameData = JSON.parse(
    localStorage.getItem("gameData")!
  ) as GameDataInterface;

  //set up default question data if it doesn't exist in local storage
  const generateCleanQuestionData = (): QuestionData => {
    const questions: Questions = {};
    const category: Category = {};

    for (let j = 0; j < gameData.cols; j++) {
      category[j.toString()] = "category" + j.toString();
      for (let i = 1; i < gameData.rows; i++) {
        const questionKey = `${j}${i}`;
        questions[questionKey] = {
          question: "question" + questionKey,
          column: j,
          row: i,
          clicked: false,
        };
      }
    }

    return {
      questions,
      category,
    };
  };

  if (
    !localStorage.getItem("questionData") ||
    JSON.parse(localStorage.getItem("gameData")!).rows != defaultGameRows ||
    JSON.parse(localStorage.getItem("gameData")!).cols != defaultGameCols
  ) {
    localStorage.setItem(
      "questionData",
      JSON.stringify(generateCleanQuestionData())
    );
    console.log("question data generated");
  }

  //checks if teams exists in local storage from before
  localStorage.getItem("teams")
    ? console.log("teams already exist")
    : localStorage.setItem("teams", JSON.stringify({ teams: [] }));

  const restartGame = () => {
    //set all questions to not clicked
    const questionData = JSON.parse(localStorage.getItem("questionData")!);
    for (let i = 0; i < gameData.cols; i++) {
      for (let j = 1; j < gameData.rows; j++) {
        questionData.questions[i + "" + j].clicked = false;
      }
    }
    localStorage.setItem("questionData", JSON.stringify(questionData));

    //set all teams score to 0
    const teams = JSON.parse(localStorage.getItem("teams")!);
    for (let i = 0; i < teams.teams.length; i++) {
      teams.teams[i].score = 0;
    }
    localStorage.setItem("teams", JSON.stringify(teams));
    window.location.reload();
  };

  return (
    <>
      <a
        className={styles.button + " " + styles.setupTeamsButton}
        href="/teams">
        Setup Teams
      </a>
      <a
        className={styles.button + " " + styles.setupQuestionsButton}
        href="/questions">
        Setup Game
      </a>
      <a
        className={styles.button + " " + styles.restartButton}
        onClick={restartGame}>
        Restart Game
      </a>
      <Leaderboard />
      <Board gameData={gameData} />
    </>
  );
}

export default App;
