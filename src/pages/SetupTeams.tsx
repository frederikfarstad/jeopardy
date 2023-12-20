import { useState } from "react";
import styles from "./SetupTeams.module.css";

interface teamsInterface {
  teams: {
    name: string;
    score: number;
  }[];
}

function SetupTeams() {
  const [teams, setTeams] = useState<teamsInterface>(
    localStorage.getItem("teams")
      ? JSON.parse(localStorage.getItem("teams")!)
      : { teams: [] }
  );

  const addTeam = () => {
    const teamInput = (document.querySelector("input") as HTMLInputElement)
      .value;

    //check if the input is empty
    const teamName =
      teamInput == ""
        ? "Team " +
          (JSON.parse(localStorage.getItem("teams")!).teams.length + 1)
        : teamInput;

    //get the list of teams from the local storage
    const teamList: teamsInterface = JSON.parse(localStorage.getItem("teams")!);

    //check if the team already exists
    for (let i = 0; i < teamList.teams.length; i++) {
      if (teamList.teams[i].name == teamName) {
        alert("team already exists");
        return;
      }
    }

    //update teamList
    teamList.teams.push({ name: teamName, score: 0 });

    setTeams(teamList);

    localStorage.setItem("teams", JSON.stringify(teamList));

    (document.querySelector("input") as HTMLInputElement).value = "";
  };

  const removeTeam = () => {
    //get the list of teams from the local storage
    const teamList: teamsInterface = localStorage.getItem("teams")
      ? JSON.parse(localStorage.getItem("teams")!)
      : { teams: [] };

    //remove the last team
    teamList.teams.pop();

    setTeams(teamList);

    //update local storage
    localStorage.setItem("teams", JSON.stringify(teamList));
  };

  return (
    <>
      <a className={styles.backButton} href="/">
        Back
      </a>
      <div className={styles.setupContainer}>
        <button className={styles.teamButton} onClick={addTeam}>
          Add Team
        </button>
        <input type="text" placeholder="team name"></input>

        <p>Teams:</p>
        <div className={styles.teamContainer}>
          <div className={styles.team}>
            <h1>Name</h1>
            <h1>Score</h1>
          </div>
          {teams.teams.map((team, index) => (
            <div key={index} className={styles.team}>
              <h1>{team.name}</h1>
              <h1>{team.score}</h1>
            </div>
          ))}
        </div>
        <button className={styles.teamButton} onClick={removeTeam}>
          Remove Team
        </button>
      </div>
    </>
  );
}

export default SetupTeams;
