/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import LabeledSelect from "./index";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
describe("LabeledSelect component", () => {
  test("renders labeled select with correct attributes", () => {
    const props = {
      htmlFor: "department-select",
      label: "Department",
      name: "department",
      options: [
        { value: "HR", label: "Human Resources" },
        { value: "IT", label: "Information Technology" },
      ],
      defaultValue: { value: "HR", label: "Human Resources" },
      placeholder: "Select department",
      onChange: jest.fn(),
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LabeledSelect {...props} />
        </MemoryRouter>
      </Provider>
    );

    const label = screen.getByLabelText(props.label);
    const select = screen.getByRole("combobox");

    expect(label).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("id", props.htmlFor);
    expect(screen.getByText("Human Resources")).toBeInTheDocument();
  });

  //   test("calls onChange handler when an option is selected", () => {
  //     const props = {
  //       htmlFor: "department-select",
  //       label: "Department",
  //       name: "department",
  //       options: [
  //         { value: "HR", label: "Human Resources" },
  //         { value: "IT", label: "Information Technology" },
  //       ],
  //       defaultValue: null,
  //       placeholder: "Select department",
  //       onChange: jest.fn(),
  //     };

  //     render(
  //       <Provider store={store}>
  //         <MemoryRouter>
  //           <LabeledSelect {...props} />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     const select = screen.getByRole("combobox");

  //     // Open the dropdown menu
  //     fireEvent.keyDown(select, { key: "ArrowDown", code: "ArrowDown" });

  //     // Click on an option in the dropdown menu
  //     const option = screen.getByText("Human Resources");
  //     fireEvent.click(option);

  //     expect(props.onChange).toHaveBeenCalledWith({
  //       value: "HR",
  //       label: "Human Resources",
  //     });
  //   });
});
