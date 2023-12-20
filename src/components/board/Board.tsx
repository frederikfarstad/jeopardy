import style from "./Board.module.css";
import Playpiece from "../playpiece/Playpiece.tsx";
import { useState } from "react";

interface GameDataInterface {
  rows: number;
  cols: number;
}

interface BoardProps {
  gameData: GameDataInterface;
}

interface teamInterface {
  name: string;
  score: number;
}

interface teamsInterface {
  teams: teamInterface[];
}

const Board = ({ gameData }: BoardProps) => {
  const questionData = JSON.parse(localStorage.getItem("questionData")!);

  const [currentQRow, setCurrentQRow] = useState(0);
  const [currentQCol, setCurrentQCol] = useState(0);
  const [currentQScore, setCurrentQScore] = useState(0);

  const [showQuestion, setShowQuestion] = useState(false);

  const handleClick = (row: number, col: number, score: number) => {
    setCurrentQRow(row);
    setCurrentQCol(col);
    setCurrentQScore(score);

    //set the question as clicked
    questionData.questions[col + "" + row].clicked = true;
    localStorage.setItem("questionData", JSON.stringify(questionData));

    console.log("clicked" + " " + col + " " + row + " " + score);
    setShowQuestion(true);
  };

  return (
    <div className={style.boardContainer}>
      {Array.from({ length: gameData.cols }, (_, i) => (
        <div key={i} className={style.rowContainer}>
          {Array.from({ length: gameData.rows }, (_, j) =>
            j == 0 ? (
              <Playpiece
                key={i + " " + j}
                row={j}
                col={i}
                category
                handleClick={handleClick}
              />
            ) : (
              <Playpiece
                key={i + " " + j}
                row={j}
                col={i}
                score={j * 200}
                hasClicked={
                  questionData.questions[i + "" + j].clicked ? true : false
                }
                handleClick={handleClick}
              />
            )
          )}
        </div>
      ))}
      {showQuestion && (
        <div className={style.questionOverlay}>
          <div className={style.questionCard}>
            {/* Information inside the question card */}
            <h1>
              {
                JSON.parse(localStorage.getItem("questionData")!).category[
                  currentQCol
                ]
              }{" "}
              {currentQScore}
            </h1>
            <p>
              {
                JSON.parse(localStorage.getItem("questionData")!).questions[
                  currentQCol + "" + currentQRow
                ].question
              }
            </p>
            <div className={style.pointContainer}>
              <label>
                Team:
                <select name="team">
                  <option value="noTeam">No team</option>
                  {JSON.parse(localStorage.getItem("teams")!).teams.map(
                    (team: teamInterface) => (
                      <option value={team.name} key={team.name}>
                        {team.name}
                      </option>
                    )
                  )}
                </select>
              </label>
              <button
                onClick={() => {
                  //get team name
                  const teamName = (
                    document.querySelector("select") as HTMLSelectElement
                  ).value;

                  //get the list of teams from the local storage
                  const teamList: teamsInterface = JSON.parse(
                    localStorage.getItem("teams")!
                  );

                  //update the score
                  teamList.teams.forEach((team: teamInterface) => {
                    if (team.name == teamName) {
                      team.score += currentQScore;
                      console.log("gave points to " + teamName);
                    }
                  });

                  //update local storage
                  localStorage.setItem("teams", JSON.stringify(teamList));

                  setShowQuestion(false);

                  // Dispatch a custom event
                  const event = new CustomEvent("scoreUpdated", {
                    detail: teamList.teams,
                  });
                  window.dispatchEvent(event);
                }}>
                Give points
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
