import "./style.css";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

interface ArrowProps {
  clickUp: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  clickDown: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
function Arrows({ clickUp, clickDown }: ArrowProps) {
  return (
    <div className="arrows-container">
      <button onClick={clickUp} title="btnUp">
        <FaCaretUp className="arrow" />
      </button>
      <button onClick={clickDown} title="btnDown">
        <FaCaretDown className="arrow" />
      </button>
    </div>
  );
}
export default Arrows;
