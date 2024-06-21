/**
 * Button
 *
 * Renders a button with specified click handler and button name.
 *
 * @param {ButtonProps} props - The properties passed to the component.
 * @returns {JSX.Element} - Rendered button component.
 */
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
