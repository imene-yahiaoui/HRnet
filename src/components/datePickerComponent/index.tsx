import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerItemProps {
  name: string | null;
  htmlFor: string;
  nameId: string | null;
  type: string | null;
  nameLable: string | null;
  minDate: Date;
  maxDate: Date;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}
function DatePickerComponent({
  name,
  type,
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
        type={type}
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
