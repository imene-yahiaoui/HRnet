/**
 * LinkComponent
 *
 * Renders a link to navigate to different routes in the application.
 *
 * @param {LinkComponentProps} props - The properties passed to the component.
 * @returns {JSX.Element} - Rendered link component.
 */
import { Link } from "react-router-dom";
import "./style.css";
interface LinkComponentProps {
  path: string; // The path to which the link should navigate
  text: string; // The text to display for the link
  id: string; // The unique identifier for the link (used for testing)
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
