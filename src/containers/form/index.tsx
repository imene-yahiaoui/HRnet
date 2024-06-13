import LabeledInput from "../../components/labeledInput";
import DatePickerComponent from "../../components/datePickerComponent";
import { useDispatch } from "react-redux";
import { addEmployeeInfos } from "../../helpers/features/employeeSlice.ts";
import "./style.css";
import Button from "../../components/button/index";
import { useState, useRef } from "react";
import { Modal } from "modal-react-vite-ts";
import LabeledSelect from "../../components/labeledSelect";
import departmentData from "../../assets/json/departmentData.json";
import StateData from "../../assets/json/statesData.json";
import DisplayMessage from "../../components/displayMessage";

interface State {
  abbreviation: string;
  name: string;
}
interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  street: HTMLInputElement;
  city: HTMLInputElement;
  state: HTMLSelectElement;
  department: HTMLSelectElement;
  zipCode: HTMLInputElement;
  dateOfBirth: HTMLInputElement;
  startDate: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  elements: FormElements;
}
function Form() {
  const dispatch = useDispatch();
  const form = useRef<FormElement | null>(null);
  const [modalisOpen, setModalisOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const [selectedOptionDepartement, setSelectedOptionDepartement] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedOptionState, setSelectedOptionState] = useState<{
    value: string;
    label: string;
  } | null>(null);
  // the min date of birth
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 70);
  // the max date of birth
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  // the min to start date
  // const minStartDate = new Date();
  // minStartDate.setDate(minStartDate.getDate());
  /**
   * optionsDepartement
   */

  const optionsDepartement = departmentData?.map((state: State) => ({
    value: state.abbreviation,
    label: state.name,
  }));
  /**
   * optionsState
   */
  const optionsState = StateData?.map((state: State) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  // Fonction for addInvalidClass
  const addInvalidClass = (inputName: string) => {
    const inputElement = form.current?.elements?.namedItem(inputName) as
      | HTMLInputElement
      | HTMLSelectElement;

    if (inputElement && !inputElement.value) {
      inputElement.classList.add("invalid");
    } else {
      inputElement?.classList.remove("invalid");
    }
  };
  const addinvalidAll = () => {
    addInvalidClass("firstName");
    addInvalidClass("lastName");
    addInvalidClass("street");
    addInvalidClass("city");
    addInvalidClass("zipCode");
    addInvalidClass("startDate");
    addInvalidClass("dateOfBirth");
    addInvalidClass("state");
    addInvalidClass("department");
  };
  //click on save btn
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const employeeInfo = [];
    const ValuefirstName = form?.current?.firstName?.value?.trim();
    const ValuelastName = form?.current?.lastName?.value.trim();
    const ValueStreet = form?.current?.street?.value.trim();
    const ValueCity = form?.current?.city?.value.trim();
    const ValueState = form?.current?.state?.value;
    const ValueDepartment = form?.current?.department?.value;
    const ValueZipCode = form?.current?.zipCode.value.trim();
    /**
     * chek validation
     */

    if (form.current?.checkValidity()) {
      console.log("Form is valid!");

      const employeeData = {
        firstName: ValuefirstName,
        lastName: ValuelastName,
        street: ValueStreet,
        city: ValueCity,
        state: ValueState,
        department: ValueDepartment,
        zipCode: ValueZipCode,
        dateOfBirth: form.current.dateOfBirth.value,
        startDate: form.current.startDate.value,
      };
      /**
       * Add employee data to the employee array
       */

      employeeInfo?.push(employeeData);
      console.log("Employee Array:", employeeInfo);
      addinvalidAll();

      dispatch(addEmployeeInfos(employeeData));

      setModalisOpen(true);
    } else {
      console.log("Form is invalid!");
      //add css to invalid cas
      addinvalidAll();
      /**
       * msg err
       */
      DisplayMessage(
        "Please fill out the form correctly",
        "linear-gradient(to right, #b90909, #b90908)"
      );
      form.current?.reportValidity();
    }
  };
  /**
   * close Modal
   */

  const closeModal = () => {
    setModalisOpen(false);
    //delet value
    if (form.current) {
      form.current.firstName.value = "";
      form.current.lastName.value = "";
      setDateOfBirth(null);
      setStartDate(null);
      setSelectedOptionDepartement(null);
      setSelectedOptionState(null);
      form.current.dateOfBirth.value = "";
      form.current.street.value = "";
      form.current.city.value = "";
      form.current.zipCode.value = "";
    }
  };

  return (
    <>
      <div className="container">
        <form ref={form}>
          <LabeledInput
            type="text"
            name="firstName"
            nameLable="First Name"
            nameId="first-name"
          />
          <LabeledInput
            type="text"
            nameLable="Last Name"
            name="lastName"
            nameId="last-name"
          />
          <DatePickerComponent
            htmlFor="dateOfBirth"
            name="dateOfBirth"
            nameLable="Date Of Birth"
            nameId="dateOfBirth"
            minDate={minDate}
            maxDate={maxDate}
            selectedDate={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
          />

          <DatePickerComponent
            htmlFor="startDate"
            name="startDate"
            nameLable="Start Date"
            nameId="startDate"
            minDate={minDate}
            maxDate={null}
            selectedDate={startDate}
            onChange={(date) => setStartDate(date)}
          />

          <fieldset className="address">
            <legend>Address</legend>
            <LabeledInput
              type="text"
              nameLable="Street"
              name="street"
              nameId="street"
            />
            <LabeledInput
              type="text"
              nameLable="City"
              name="city"
              nameId="city"
            />
            <LabeledSelect
              htmlFor="state"
              label="State"
              name="state"
              defaultValue={selectedOptionState}
              onChange={setSelectedOptionState}
              options={optionsState}
              placeholder="Alabama"
            />
            <LabeledInput
              type="number"
              nameLable="Zip Code"
              name="zipCode"
              nameId="zip-code"
            />
          </fieldset>

          <LabeledSelect
            htmlFor="department"
            label="Department"
            name="department"
            defaultValue={selectedOptionDepartement}
            onChange={setSelectedOptionDepartement}
            options={optionsDepartement}
            placeholder="Sales"
          />
        </form>
        <Button btnName="Save" click={handleClick} />
      </div>
      {modalisOpen ? (
        <Modal
          confirmBtn="close"
          closeModalFunction={closeModal}
          handleConfirmClick={closeModal}
          message="Employee Created!"
          xBtn="x"
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Form;
