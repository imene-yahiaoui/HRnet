import "./style.css";

function LabeledSelect({ name, nameId, options }) {
  return (
    <>
      <label htmlFor={nameId}>{name}</label>
      <select name={nameId} id={nameId}>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
export default LabeledSelect;
