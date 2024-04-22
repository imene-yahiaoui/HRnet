import LabeledSelect from "../../components/labeledSelect";
import statesData from "../../assets/json/statesData.json";
function State() {
  return (
    <LabeledSelect
      options={statesData.map((stat) => ({
        key: stat.abbreviation,
        label: stat.name,
      }))}
      name="State"
      nameId="state"
    />
  );
}
export default State;
