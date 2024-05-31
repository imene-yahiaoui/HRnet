import "./style.css";

interface ButtonProps {
  click: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
