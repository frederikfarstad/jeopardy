import { useState } from "react";
import style from "./Playpiece.module.css";

interface PlaypieceProps {
  category?: boolean;
  score?: number;
  row?: number;
  col?: number;
  hasClicked?: boolean;
  handleClick?: (row: number, col: number, score: number) => void;
}

const Playpiece = ({
  category,
  score,
  row,
  col,
  hasClicked,
  handleClick,
}: PlaypieceProps) => {
  const [clicked, setClicked] = useState(hasClicked);

  return (
    <div
      className={
        !category
          ? clicked
            ? style.pieceContainer + " " + style.clicked
            : style.pieceContainer
          : style.categoryContainer
      }
      onClick={() => {
        if (!clicked && !category && handleClick) {
          handleClick(row!, col!, score!);
          setClicked(true);
        }
      }}>
      <p>
        {score
          ? score
          : JSON.parse(localStorage.getItem("questionData")!).category[col!]}
      </p>
    </div>
  );
};

export default Playpiece;
