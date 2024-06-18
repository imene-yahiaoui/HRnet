import "./style.css";
interface LabeledInputProps {
  name: string;
  nameId: string;
  type: string;
  nameLable: string;
  autocomplete: string;
}
function LabeledInput({ name, type, nameId, nameLable }: LabeledInputProps) {
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
