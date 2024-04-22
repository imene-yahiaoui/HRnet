import "./style.css";

interface ButtonProps {
  click: () => void;
  btnName: string;
}
function Button({ click, btnName }: ButtonProps) {
  return (
    <button className="btn" onClick={click}>
      {btnName}
    </button>
  );
}
export default Button;
