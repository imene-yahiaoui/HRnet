import "./style.css";
interface LabeledInputProps {
  name: string;
  nameId: string;
  type:string;
}
function LabeledInput({ name, type, nameId }:LabeledInputProps) {
  return (
    <>
      <label htmlFor={nameId}>{name}</label>
      <input type={type} id={nameId} />
    </>
  );
}
export default LabeledInput;
