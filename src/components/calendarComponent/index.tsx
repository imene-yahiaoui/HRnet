import Calendar from "react-calendar";
import LabeledInput from "../labeledInput";
import { useState, useEffect } from "react";
import "./style.css";
import "react-calendar/dist/Calendar.css";

// type ValuePiece = Date | null;

  type Value = Date | null;

function CalendarComponent() {
  const [value, onChange] = useState<Value>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dateValue, setDateValue] = useState<any>(null);
  const [ishandelInside, setIshandelInside] = useState<boolean>(false);
  /**
   * function close calender
   */
  const toggleCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsCalendarOpen(!isCalendarOpen);
  };
  /**
   * userEffect for examen is i click outside the calender or not ?if yes then close it.
   */

  useEffect(() => {
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isCalendarOpen &&
        !document
          .getElementById("calendar-container")
          ?.contains(event.target as Node) &&
        !document
          .getElementById("date-of-birth")
          ?.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);
  const inputValue = document.getElementById(
    "date-of-birth"
  ) as HTMLInputElement | null;

  /**
   * if i click in the calender
   */
  useEffect(() => {
    console.log("calendar is updated:", isCalendarOpen);
    const handleClickInside = (event: MouseEvent) => {
      const calendarTiles = document.querySelectorAll(
        ".react-calendar__tile.react-calendar__month-view__days__day"
      );
      calendarTiles.forEach((tile) => {
        if (tile.contains(event.target as Node)) {
          setIshandelInside(true);
        }
      });
    };

    document.addEventListener("mousedown", handleClickInside);

    return () => {
      document.removeEventListener("mousedown", handleClickInside);
    };
  }, [isCalendarOpen, ishandelInside]);
  /**
   * update value input
   */
  useEffect(() => {
    console.log("ishandelInside  is updated:", ishandelInside);
    if (ishandelInside) {
      console.log("je suis rentrer dans la boucle ");
      console.log("value", value);
      const formattedDate = `${String(value?.getDate()).padStart(
        2,
        "0"
      )}/${String((value?.getMonth() ?? 0) + 1).padStart(
        2,
        "0"
      )}/${value?.getFullYear()}`;
      setDateValue(formattedDate);
      if (inputValue) inputValue.value = dateValue;
    }
  }, [dateValue, inputValue, isCalendarOpen, ishandelInside, value]);
 function enChangeFunction(date: Value,e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  onChange(date);
  //close calender
  setIsCalendarOpen(false);

}
  return (
    <>
      <div>
        <p> Date of Birth </p>
        <button title="date" onClick={toggleCalendar} className="inputDate-btn">
          <LabeledInput type="text" nameId="date-of-birth" name="" />
        </button>
      </div>
      {isCalendarOpen && (
        <div id="calendar-container">
          <Calendar
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
           onChange={enChangeFunction}
           
            value={value as Date}
          />
        </div>
      )}
    </>
  );
}
export default CalendarComponent;
