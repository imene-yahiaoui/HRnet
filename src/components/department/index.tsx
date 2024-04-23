import "./style.css";

import LabeledSelect from "../../components/labeledSelect";
import departmentData from "../../assets/json/departmentData.json";
function Department() {
  return (
    <LabeledSelect
      options={departmentData.map((stat) => ({
        key: stat.abbreviation,
        label: stat.name,
      }))}
      name="Department"
      nameId="department"
    />
  );
}
export default Department;
