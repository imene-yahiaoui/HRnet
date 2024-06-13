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
  id: string;
}
const LinkComponent = ({ path, text, id }: LinkComponentProps) => {
  return (
    <>
      <Link className="link" data-testid={id} to={path}>
        {text}
      </Link>
    </>
  );
};

export default LinkComponent;
