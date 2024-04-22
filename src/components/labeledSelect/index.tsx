/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { FaCaretDown } from "react-icons/fa";
interface LabeledSelectProps {
  name: string;
  nameId: string;
  options: [] | any;
}
function LabeledSelect({ name, nameId, options }: LabeledSelectProps) {
  return (
    <div>
      <label htmlFor={nameId}>{name}</label>
      <div className="select-container">
        <select name={nameId} id={nameId} className="selectBox">
          {options.map((option:any) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>

        <FaCaretDown className="icon" />
      </div>
    </div>
  );
}
export default LabeledSelect;
