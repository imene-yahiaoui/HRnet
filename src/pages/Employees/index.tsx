/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Employees Component
 *
 * Renders the Employees page which displays a table of current employees .
 *
 * @returns {JSX.Element} - Rendered component.
 */
import Header from "../../components/header";
import LinkComponent from "../../components/link";
import Table from "../../containers/table/index";
import "./style.css";
import Data from "../../assets/json/mockData.json";
import { useSelector } from "react-redux";
import { selectEmployees } from "../../helpers/features/employeeSlice";

const Employees = () => {
  /**
   * Get the employees data from the Redux store, fallback to mock data if not available
   */
  const employeesData = useSelector(selectEmployees) || [];
  console.log("ici resu", employeesData);
  /**
   *  Determine the data to be used in the table
   * if dont have data use mockData
   */
  const haveData = employeesData?.length > 0 ? employeesData : Data;
  /**
   * Define the columns for the table
   */
  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Start Date",
      accessor: "startDate",
    },
    {
      Header: "Department",
      accessor: "department",
    },
    {
      Header: "Date of Birth",
      accessor: "dateOfBirth",
    },
    {
      Header: "Street",
      accessor: "street",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "State",
      accessor: "state",
    },
    {
      Header: "Zip Code",
      accessor: "zipCode",
    },
  ];
  employeesData;

  return (
    <div className="body-Employees">
      <Header title="Current Employees" />
      <Table columns={columns} data={haveData} />
      <LinkComponent path="/" text="Home" id="home" />
    </div>
  );
};

export default Employees;
