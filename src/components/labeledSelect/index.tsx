/**
 * LabeledSelect Component
 *
 * Renders a labeled select dropdown using the react-select library.
 *
 * @param {LabeledSelectProps} props - The properties passed to the component.
 * @returns {JSX.Element} - Rendered labeled select component.
 */
import Select from "react-select";
import "./style.css";
interface OptionType {
  value: string;
  label: string;
}
interface LabeledSelectProps {
  htmlFor: string;
  label: string;
  name: string;
  options: OptionType[];
  defaultValue: OptionType | null;
  placeholder: string;
  onChange: (string: OptionType | null) => void;
}
function LabeledSelect({
  name,
  options,
  defaultValue,
  placeholder,
  onChange,
  htmlFor,
  label,
}: LabeledSelectProps) {
  return (
    <div className="select-container">
      <label htmlFor={htmlFor}>{label}</label>

      <Select
        className="select"
        inputId={htmlFor}
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
