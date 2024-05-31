import "./style.css";
interface LabeledInputProps {
  name: string | null;
  nameId: string | null;
  type: string | null;
  nameLable: string | null;
}
function LabeledInput({ name, type, nameId, nameLable }: LabeledInputProps) {
  return (
    <>
      <label htmlFor={name}>{nameLable}</label>
      <input  className ="inputUser" type={type} id={nameId} name={name}  defaultValue="" required/>
    </>
  );
}
export default LabeledInput;
