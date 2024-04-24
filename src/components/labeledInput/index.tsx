/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
interface LabeledInputProps {
  name: string;
  nameId: string;
  type: string;

}
function LabeledInput({ name, type, nameId }: LabeledInputProps) {
  return (
    <>
      <label htmlFor={nameId}>{name}</label>
      <input type={type} id={nameId} defaultValue=""   />
    </>
  );
}
export default LabeledInput;
