/* eslint-disable @typescript-eslint/no-explicit-any */
import LabeledSelect from "../../components/labeledSelect";
import statesData from "../../assets/json/statesData copy.json";

function State() {
  return (
    <LabeledSelect
      options={statesData.map((stat:any) => ({
        key: stat.abbreviation,
        label: stat.name,
      }))}
      name="State"
      nameId="state"
    />
  );
}
export default State;
