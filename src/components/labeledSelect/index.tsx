import Select from "react-select";
import "./style.css";
interface LabeledSelectProps {
  htmlFor: string;
  label: string;
  name: string;
  nameId: string;
  options: [];
  defaultValue: string;
  placeholder: string;
  onChange: () => void;
}
function LabeledSelect({
  name,
  nameId,
  options,
  defaultValue,
  placeholder,
  onChange,
  htmlFor,
  label,
  className,
}: LabeledSelectProps) {
  return (
    <div className="select-container">
      <label htmlFor={nameId} htmlFor={htmlFor}>
        {label}
      </label>

      <Select
        className={`select   ${className}`}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
export default LabeledSelect;
