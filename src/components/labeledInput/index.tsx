/**
 * LabeledInput Component
 *
 * Renders a labeled input field with specified attributes.
 *
 * @param {LabeledInputProps} props - The properties passed to the component.
 * @returns {JSX.Element} - Rendered labeled input component.
 */
import "./style.css";
interface LabeledInputProps {
  name: string;
  nameId: string;
  type: string;
  nameLable: string;
  autocomplete: string;
}
function LabeledInput({ name, type, nameId, nameLable ,autocomplete}: LabeledInputProps) {
  return (
    <>
      <label htmlFor={nameId}>{nameLable}</label>
      <input
        className="inputUser"
        type={type}
        id={nameId}
        name={name}
        defaultValue=""
        autoComplete={autocomplete}
        required
      />
    </>
  );
}
export default LabeledInput;
