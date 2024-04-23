/**
 * Employees Component
 *
 * Renders the Employees page  .
 *
 * @returns {JSX.Element} - Rendered component.
 */
import Header from "../../components/header" ;
import LinkComponent from "../../components/link";
import Show from "../../components/show";
import "./style.css";


const Employees = () => {
  return (
    <div>
 <Header title="Current Employees" />
 <Show/>
 <LinkComponent path="/" text="Home" />
 
    </div>
  );
};

export default Employees;
