/**
 * NotFound Component
 *
 * Renders the 404 error page with a message informing the user that the requested page does not exist.
 *
 * @returns {JSX.Element} - Rendered component.
 */
import { Link } from "react-router-dom";
import "./style.css";
interface LinkComponentProps {
  path: string;
  text: string;
 
}
const LinkComponent = ({path,text}:LinkComponentProps) => {
  return (
 <>
      <Link className="link" to={path}>{text}</Link>
 </>
  );
};

export default LinkComponent;