/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { FaChevronDown } from "react-icons/fa";
function Show() {
  const optionShow = [
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
  ];
  return (
    <div className="showContainer">
      <label htmlFor="show">Show</label>
      <div className="select-container-show ">
        <select name="show" id="show" className="selectBox-show">
          {optionShow.map((option: any) => (
            <option key={option.value}>{option.value}</option>
          ))}
        </select>

        <FaChevronDown className="icon-show" />
      </div>
      <p>entries</p>
    </div>
  );
}
export default Show;
