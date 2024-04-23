/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import Arrows from "../../components/arrows"

function Table() {
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

  return (
    <table className="table-container">
        <thead>
      <tr className="table-row">
        {columns.map((th: any) => (
          <th key={th.title}>{th.title} 
          <Arrows/></th>
        ))}
      </tr>
      </thead>
    </table>
  );
}
export default Table;
