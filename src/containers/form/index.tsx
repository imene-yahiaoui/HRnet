import LabeledInput from "../../components/labeledInput";

import Department from "../../components/department";
import State from "../state";
import "./style.css";
// import { useState } from 'react';
 import  CalendarComponent from "../../components/calendarComponent";
import Button from '../../components/button/index';

 

function Form() {
  const handleClick = (e) => {
    e.preventDefault
     console.log("Button clicked!");
  };


  return (
    <div className="container">
      <form>
        <LabeledInput 
          type="text" 
          name="First Name" 
          nameId="first-name" 
        />
        <LabeledInput 
          type="text" 
          name="Last Name" 
          nameId="last-name" 
        />
<CalendarComponent/>
        <LabeledInput 
          type="text" 
          name="Start Date" 
          nameId="start-date" 
        />

        <fieldset className="address">
          <legend>Address</legend>
          <LabeledInput 
            type="text" 
            name="Street" 
            nameId="street" 
          />
          <LabeledInput 
            type="text" 
            name="City" 
            nameId="city" 
          />
          <State />
          <LabeledInput 
            type="number" 
            name="Zip Code" 
            nameId="zip-code" 
          />
        </fieldset>
        <Department />
      </form>
      <Button btnName="Save" click={handleClick}/>
    </div>
  );
}

export default Form;
