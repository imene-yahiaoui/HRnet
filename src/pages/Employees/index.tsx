/**
 * Employees Component
 *
 * Renders the Employees page  .
 *
 * @returns {JSX.Element} - Rendered component.
 */
import Header from "../../components/header" ;
import LinkComponent from "../../components/link";

import Table from "../../containers/table/index"
import "./style.css";
import Data from "../../assets/json/mockData.json"

const Employees = () => {
  const columns = [
    {
      Header: 'First Name',
      accessor: 'first-name',  
    },
    {
      Header: 'Last Name',
      accessor: 'last-name',
    },
    {
      Header: 'Start Date',
      accessor: 'start-date',
    },
    {
      Header: 'Department',
      accessor: 'department',
    },
    {
      Header: 'Date of Birth',
      accessor: 'date-of-birth',
    },
    {
      Header: 'Street',
      accessor: 'street',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'State',
      accessor: 'state',
    },
    {
      Header: 'Zip Code',
      accessor: 'zip-code',
    },
  ];


  return (
    <div className="body-Employees">
 <Header title="Current Employees" />
 <div className="header-Employees">




 </div>
 <Table   columns={columns} data={Data} />
 <LinkComponent path="/" text="Home" />

    </div>
  );
};

export default Employees;
