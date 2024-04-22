/**
 * Home Component
 *
 * Renders the home page  .
 *
 * @returns {JSX.Element} - Rendered component.
 */
import Header from "../../components/header" ;
import LinkComponent from "../../components/link"
import "./style.css";


const Home = () => {
  return (
    <div className='homePage'>
 <Header title="HRnet" />
 <LinkComponent path="/Employees" text="View Current Employees" />
 <h2>Create Employee </h2>
    </div>
  );
};

export default Home;