import "./style.css";
import { FaCaretDown } from "react-icons/fa";
function LabeledSelect({ name, nameId, options }) {
  return (
    <div>
      <label htmlFor={nameId}>{name}</label>
      <div className="select-container">
        <select name={nameId} id={nameId} className="selectBox">
          {options.map((option) => (
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
