import "./style.css";
interface HeaderProps {
  title: string;
}
function Header({ title }: HeaderProps) {
  return <h1 className="headerTitle">{title}</h1>;
}
export default Header;
