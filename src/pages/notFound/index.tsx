/**
 * NotFound Component
 *
 * Renders the 404 error page with a message informing the user that the requested page does not exist.
 *
 * @returns {JSX.Element} - Rendered component.
 */
import { Link } from "react-router-dom";
import "./style.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <p className="notFound-p">
        Oups! La page que <span>vous demandez n'existe pas.</span>
      </p>
      <Link to="/">Retourner sur la page d'accueil</Link>
    </div>
  );
};

export default NotFound;