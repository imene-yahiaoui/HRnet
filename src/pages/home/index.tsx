/**
 * Home Component
 *
 * Renders the home page  .
 *
 * @returns {JSX.Element} - Rendered component.
 */
import Header from "../../components/header" 
import "./style.css";


const Home = () => {
  return (
    <div className='homePage'>
 <Header title="HRnet" />
    </div>
  );
};

export default Home;