import "./style.css";

function LabeledInput({ name, type, nameId }) {
  return (
    <>
      <label htmlFor={nameId}>{name}</label>
      <input type={type} id={nameId} />
    </>
  );
}
export default LabeledInput;
