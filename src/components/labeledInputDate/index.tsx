 
interface LabeledInputProps {
  name: string | null;
  nameId: string | null;
  type: string | null;
  nameLable: string | null;
}
function LabeledInputDate({
  name,
  type,
  nameId,
  nameLable,
}: LabeledInputProps) {
  return (
    <>
      <label htmlFor={name}>{nameLable}</label>
      <input
        className="inputUser"
        type={type}
        id={nameId}
        name={name}
        onChange={(e) => console.log(e.target.value)}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        required
      />
    </>
  );
}
export default LabeledInputDate;
