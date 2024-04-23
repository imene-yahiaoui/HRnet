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
import LabeledInput from "../../components/labeledInput";
import Table from "../../containers/table"
import "./style.css";


const Employees = () => {
  return (
    <div className="body-Employees">
 <Header title="Current Employees" />
 <div className="header-Employees">
 <Show/>
 <section className="searchSection">
 <LabeledInput nameId="search" type="search" name="Search :"/>
 </section>
 </div>
 <Table/>
 <LinkComponent path="/" text="Home" />

    </div>
  );
};

export default Employees;
