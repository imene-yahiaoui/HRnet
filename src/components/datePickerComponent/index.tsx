/**
 * DatePickerComponent Component
 *
 * Renders a date picker component with a labeled input.
 *
 * @param {DatePickerItemProps} props - The properties passed to the component.
 * @returns {JSX.Element} - Rendered date picker component.
 */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerItemProps {
  name: string;
  htmlFor: string;
  nameId: string;
  nameLable: string;
  minDate: Date | null;
  maxDate: Date | null;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}
function DatePickerComponent({
  name,
  nameId,
  nameLable,
  minDate,
  maxDate,
  selectedDate,
  onChange,
  htmlFor,
}: DatePickerItemProps) {
  return (
    <div className="container-DatePicker">
      <label className="label" htmlFor={htmlFor}>
        {nameLable}
      </label>
      <DatePicker
        className="datepicker"
        id={nameId}
        name={name}
        minDate={minDate}
        maxDate={maxDate}
        selected={selectedDate}
        onChange={onChange}
        required
      />
    </div>
  );
}
export default DatePickerComponent;
