/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import Arrows from "../../components/arrows";
import { useSelector } from "react-redux";
import { selectEmployees } from "../../helpers/features/employeeSlice.ts";
function Tablesssss() {
  const employees = useSelector(selectEmployees);
  console.log("Employee data:", employees);
  const columns = [
    { title: "First Name", data: "firstName" },
    { title: "Last Name", data: "lastName" },
    { title: "Start Date", data: "startDate" },
    { title: "Department", data: "department" },
    { title: "Date of Birth", data: "dateOfBirth" },
    { title: "Street", data: "street" },
    { title: "City", data: "city" },
    { title: "State", data: "state" },
    { title: "Zip Code", data: "zipCode" },
  ];
  function clickUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    console.log("clickUp");
  }
  function clickDown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    console.log("clickDown");
  }
  return (
    <table className="table-container">
      <thead>
        <tr className="table-row">
          {columns.map((th: any) => (
            <th key={th.title}>
              {th.title}
              <Arrows clickUp={clickUp} clickDown={clickDown} />
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
}
export default Tablesssss;
