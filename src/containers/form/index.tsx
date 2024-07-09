/**
 * Form Component
 *
 * Renders a form for creating a new employee with fields for personal information and address.
 *
 * @returns {JSX.Element} - Rendered form component.
 */
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
  // the max date of start
  /**I chose to set today's date as the maximum date   */
  const maxDateStart = new Date();
  maxDateStart.setFullYear(maxDateStart.getFullYear());

  /**
   * Generates options for the department select input.
   *
   * @returns {Array<{ value: string; label: string }>} - Options for department select.
   */
  const optionsDepartement = departmentData?.map((state: State) => ({
    value: state.abbreviation,
    label: state.name,
  }));
  /**
   * Generates options for the state select input.
   *
   * @returns {Array<{ value: string; label: string }>} - Options for state select.
   */
  const optionsState = StateData?.map((state: State) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  /**
   * Adds the 'invalid' class to an input if it is empty.
   *
   * @param {string} inputName - The name of the input element.
   */
  const addInvalidClass = (name: string) => {
    const element = form.current?.elements?.namedItem(name) as
      | HTMLSelectElement
      | HTMLInputElement;

    if (element) {
      if (element instanceof HTMLInputElement && !element.value) {
        element.classList.add("invalid");
      } else if (
        element instanceof HTMLSelectElement &&
        (!element.value || element.value === "default")
      ) {
        element.classList.add("invalid");
      } else {
        element.classList.remove("invalid");
      }
    }
    //state
    const elementState = document.querySelector(".state");
    const elementDepartment = document.querySelector(".department");
    if (selectedOptionState === null) {
      elementState?.classList.add("invalid");
    } else {
      elementState?.classList.remove("invalid");
    }
    //department
    if (selectedOptionDepartement === null) {
      elementDepartment?.classList.add("invalid");
    } else {
      elementDepartment?.classList.remove("invalid");
    }
  };
  /**
   * Adds the 'invalid' class to all input elements.
   */
  const addinvalidAll = () => {
    addInvalidClass("firstName");
    addInvalidClass("lastName");
    addInvalidClass("street");
    addInvalidClass("city");
    addInvalidClass("zipCode");
    addInvalidClass("startDate");
    addInvalidClass("dateOfBirth");
  };
  /**
   * Handles the click event on the save button.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - The click event.
   */

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    /**
     * chek validation
     */
    if (form.current?.checkValidity()) {
      console.log("Form is valid!");
      const employeeData = {
        firstName: form.current.firstName.value.trim(),
        lastName: form.current.lastName.value.trim(),
        street: form.current.street.value.trim(),
        city: form.current.city.value.trim(),
        state: selectedOptionState?.value || "",
        department: selectedOptionDepartement?.value || "",
        zipCode: form.current.zipCode.value.trim(),
        dateOfBirth: form.current.dateOfBirth.value,
        startDate: form.current.startDate.value,
      };

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
   * Closes the modal and resets the form.
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
        <form ref={form} data-testid="form">
          <LabeledInput
            type="text"
            name="firstName"
            nameLable="First Name"
            nameId="first-name"
            autocomplete="given-name"
            dataTestid="first-name"
          />
          <LabeledInput
            type="text"
            nameLable="Last Name"
            name="lastName"
            nameId="last-name"
            autocomplete="family-name"
            dataTestid="last-name"
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
            maxDate={maxDateStart}
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
              autocomplete="street-address"
              dataTestid="Street"
            />
            <LabeledInput
              type="text"
              nameLable="City"
              name="city"
              nameId="city"
              autocomplete="address-level2"
              dataTestid="city"
            />
            <LabeledSelect
              htmlFor="state-select"
              label="State"
              name="state"
              className="state"
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
              autocomplete="postal-code"
              dataTestid="zipCode"
            />
          </fieldset>

          <LabeledSelect
            htmlFor="department-select"
            label="Department"
            className="department"
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
