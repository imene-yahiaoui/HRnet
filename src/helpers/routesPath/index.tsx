/**
 * Routes Path
 *
 * A component that defines the routes for the application using react-router-dom.
 * It includes routes for Home, Employees, and a NotFound page.
 *
 * @module RoutesPath
 */
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/home";
import Employees from "../../pages/Employees";
import NotFound from "../../pages/notFound";

const RoutesPath = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Employees" element={<Employees />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default RoutesPath;
