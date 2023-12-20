import styles from "./SetupGame.module.css";
import defaultQuestions from "../assets/defaultQuestions.json";

function SetupGame() {
  const resetAll = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const loadDefault = () => {
    localStorage.setItem("questionData", JSON.stringify(defaultQuestions));
    window.location.reload();
  };

  const gameData = JSON.parse(localStorage.getItem("gameData")!);

  return (
    <>
      <a className={styles.backButton} href="/">
        Back
      </a>

      <div className={styles.setupContainer}>
        <button className={styles.button} onClick={loadDefault}>
          Load default game
        </button>

        <div className={styles.questionContainer}>
          {Array.from({ length: gameData.cols }, (_, i) => (
            <div key={i} className={styles.colContainer}>
              {Array.from({ length: gameData.rows }, (_, j) =>
                j == 0 ? (
                  <div className={styles.categoryPrompt} key={i + " " + j}>
                    <p>Category {i + 1}</p>
                    <input
                      type="text"
                      defaultValue={
                        JSON.parse(localStorage.getItem("questionData")!)
                          .category[i]
                      }
                      onChange={(e) => {
                        const questionData = JSON.parse(
                          localStorage.getItem("questionData")!
                        );
                        questionData.category[i] = e.target.value;
                        localStorage.setItem(
                          "questionData",
                          JSON.stringify(questionData)
                        );
                      }}
                    />
                  </div>
                ) : (
                  <div className={styles.questionPrompt} key={i + " " + j}>
                    <p>Question for {j * 200}</p>
                    <textarea
                      defaultValue={
                        JSON.parse(localStorage.getItem("questionData")!)
                          .questions[i + "" + j].question
                      }
                      rows={2}
                      cols={50}
                      onChange={(e) => {
                        const questionData = JSON.parse(
                          localStorage.getItem("questionData")!
                        );
                        questionData.questions[i + "" + j].question =
                          e.target.value;
                        localStorage.setItem(
                          "questionData",
                          JSON.stringify(questionData)
                        );
                      }}
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </div>

        <button
          className={styles.button + " " + styles.resetButton}
          onClick={resetAll}>
          Reset ALL data (requires you to setup the game again)
        </button>
      </div>
    </>
  );
}

export default SetupGame;
