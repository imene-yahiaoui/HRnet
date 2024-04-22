import LabeledInput from "../../components/labeledInput";

import Department from "../../components/department";
import Button from "../../components/button";
import State from "../state";
import "./style.css";
function Form() {
  return (
    <div className="container">
      <form>
        <LabeledInput type="text" name="First Name" nameId="first-name" />
        <LabeledInput type="text" name="Last Name" nameId="last-name" />
        <LabeledInput type="text" name="Date of Birth" nameId="date-of-birth" />
        <LabeledInput type="text" name="Start Date" nameId="start-date" />

        <fieldset className="address">
          <legend>Address</legend>
          <LabeledInput type="text" name="Street" nameId="street" />
          <LabeledInput type="text" name="City" nameId="city" />
          <State />
          <LabeledInput type="number" name="Zip Code" nameId="zip-code" />
        </fieldset>
        <Department />
      </form>
      <Button btnName="Save" />
    </div>
  );
}
export default Form;
