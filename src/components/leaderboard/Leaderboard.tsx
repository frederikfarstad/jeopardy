import { useEffect, useState } from "react";
import styles from "./Leaderboard.module.css";

interface teamInterface {
  name: string;
  score: number;
}

const Leaderboard = () => {
  const [teams, setTeams] = useState<teamInterface[]>([]);

  const updateTeams = (event: CustomEvent) => {
    //sort teams by score
    event.detail.sort((a: teamInterface, b: teamInterface) => {
      return b.score - a.score;
    });

    setTeams(event.detail);
  };

  useEffect(() => {
    setTeams(JSON.parse(localStorage.getItem("teams")!).teams);
    // Set up an event listener for the custom event
    window.addEventListener("scoreUpdated", updateTeams as EventListener);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scoreUpdated", updateTeams as EventListener);
    };
  }, []);

  return (
    <>
      <div className={styles.leaderboardContainer}>
        <h1>Leaderboard</h1>
        <div className={styles.leaderboard}>
          {teams.map((team, index) => (
            <div key={index} className={styles.team}>
              <p>
                {team.name}: {team.score}{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
