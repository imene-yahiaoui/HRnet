import LabeledInput from "../../components/labeledInput";
import LabeledInputDate from "../../components/labeledInputDate";
import Department from "../../components/department";
import State from "../state";
import "./style.css";
import Button from "../../components/button/index";
import { useState, useRef } from "react";
import { Modal } from "modal-react-vite-ts";
/**
 * a fair ici

 
 * change start date
 * sed that to redux
 * if value empty err message
 */
function Form() {
  const form = useRef();
  const [modalisOpen, setModalisOpen] = useState(false);

  // Fonction for addInvalidClass
  const addInvalidClass = (inputName: string) => {
    const inputElement = form.current?.elements.namedItem(
      inputName
    ) as HTMLInputElement;
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
  };
  //click on save btn
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const ValuefirstName = form?.current?.firstName?.value?.trim();
    const ValuelastName = form?.current?.lastName?.value.trim();
    const ValueStreet = form?.current?.street?.value.trim();
    const ValueCity = form?.current?.city?.value.trim();
    const ValueZipCode = form?.current?.zipCode.value.trim();
    console.log("first Values:", ValuefirstName);
    console.log("lastValues:", ValuelastName);
    console.log("startDate:", form.current.startDate.value);
    console.log("dateOfBirth:", form.current.dateOfBirth.value);
    console.log("street:", ValueStreet);
    console.log("city:", ValueCity);
    console.log("zipCode:", ValueZipCode);

    ///ckek validation
    if (form.current?.checkValidity()) {
      console.log("Form is valid!");
      setModalisOpen(true);
      addinvalidAll();
    } else {
      console.log("Form is invalid!");
      //add css to invalid cas
      addinvalidAll();

      form.current?.reportValidity();
    }
  };
  //close modal
  const closeModal = () => {
    setModalisOpen(false);
    //delet value
    form.current.firstName.value = "";
    form.current.lastName.value = "";
    form.current.startDate.value = "";
    form.current.dateOfBirth.value = "";
    form.current.street.value = "";
    form.current.city.value = "";
    form.current.zipCode.value = "";
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
          <LabeledInputDate
            type="text"
            name="dateOfBirth"
            nameLable="Date Of Birth"
            nameId="dateOfBirth"
          />

          <LabeledInputDate
            type="text"
            name="startDate"
            nameLable="Start Date"
            nameId="startDate"
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
            <State />
            <LabeledInput
              type="number"
              nameLable="Zip Code"
              name="zipCode"
              nameId="zip-code"
            />
          </fieldset>
          <Department />
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
