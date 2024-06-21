/**
 * Header Component
 *
 * Renders a header with a specified title.
 *
 * @param {HeaderProps} props - The properties passed to the component.
 * @returns {JSX.Element} - Rendered header component.
 */
import "./style.css";
interface HeaderProps {
  title: string;
}
function Header({ title }: HeaderProps) {
  return <h1 className="headerTitle">{title}</h1>;
}
export default Header;
