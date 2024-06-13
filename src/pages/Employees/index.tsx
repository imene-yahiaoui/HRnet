/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Employees Component
 *
 * Renders the Employees page  .
 *
 * @returns {JSX.Element} - Rendered component.
 */
import Header from "../../components/header";
import LinkComponent from "../../components/link";
import { useState, useEffect } from "react";
import Table from "../../containers/table/index";
import "./style.css";
 
// import Data from "../../assets/json/mockData.json";
import { useSelector } from "react-redux";
import { selectEmployees } from "../../helpers/features/employeeSlice";
type data = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: number;
  department: string;
  zipCode: string;
  dateOfBirth: string;
  startDate: string;
};
const Employees = () => {
  const [data, setData] = useState<data[]>([]);
  const employeesData = useSelector(selectEmployees) || [];
  console.log("ici resu", employeesData);

  //fetch

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requete = await fetch("../../data.json", {
          method: "GET",
        });
        if (requete.ok) {
          const response:any = await requete.json();
          setData(response);
        }
      } catch (e) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          e
        );
      }
    };
    fetchData();
  }, []);

  const haveData = employeesData?.length > 0 ? employeesData : data;
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
  console.log(haveData, "haveData");
  console.log(data, "data");
  console.log(employeesData, "employeesData");
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
