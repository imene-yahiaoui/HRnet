/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import DatePicker from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("DatePicker component", () => {
  test("renders DatePicker with correct date", () => {
    const onChange = jest.fn();
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 70);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    const selected = new Date("07/01/1983");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <DatePicker
            onChange={onChange}
            htmlFor="dateOfBirth"
            name="dateOfBirth"
            nameLable="Date Of Birth"
            nameId="dateOfBirth"
            minDate={minDate}
            maxDate={maxDate}
            selectedDate={selected}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(selected).toEqual(new Date("07/01/1983"));
  });
});
