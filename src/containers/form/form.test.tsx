import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import DisplayMessage from "../../components/displayMessage";
import { Modal } from "modal-react-vite-ts";
import { addEmployeeInfos } from "../../helpers/features/employeeSlice.ts";
jest.setTimeout(10000);
jest.mock("../../components/displayMessage");

// Helper function to render the form component
const renderForm = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    </Provider>
  );
};

describe("Form component", () => {
  test("renders Form", () => {
    renderForm();
    expect(screen.getByTestId("first-name")).toBeInTheDocument();
    expect(screen.getByTestId("last-name")).toBeInTheDocument();
    expect(screen.getByTestId("Street")).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByTestId("city")).toBeInTheDocument();
    expect(screen.getByTestId("zipCode")).toBeInTheDocument();
    expect(screen.getByLabelText(/department/i)).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should dispatch employee information on save", async () => {
    console.log = jest.fn();

    renderForm();

    const form = screen.getByTestId("form") as HTMLFormElement;
    expect(form).toBeInTheDocument();

    const fields = [
      { name: "firstName", value: "John" },
      { name: "lastName", value: "Doe" },
      { name: "dateOfBirth", value: "1990-01-01", expectedValue: "01/01/1990" },
      { name: "startDate", value: "2024-01-01", expectedValue: "01/01/2024" },
      { name: "street", value: "123 Street" },
      { name: "city", value: "City of code" },
      { name: "zipCode", value: 5001 },
      { name: "state", value: "Alabama", isSelect: true },
      { name: "department", value: "Sales", isSelect: true },
    ];

    for (const field of fields) {
      if (field.isSelect) {
        const selectElement = screen.getByLabelText(
          new RegExp(field.name, "i")
        );
        expect(selectElement).toBeInTheDocument();

        // Open the select dropdown
        userEvent.click(selectElement);

        // Select the option
        const option = screen.getByText(field.value);
        userEvent.click(option);

        await waitFor(() =>
          expect(screen.getByText(field.value)).toBeInTheDocument()
        );
      } else {
        const element = form.elements.namedItem(field.name) as HTMLInputElement;
        expect(element).toBeInTheDocument();

        fireEvent.change(element, { target: { value: field.value } });
        if (field.expectedValue) {
          await waitFor(() => expect(element).toHaveValue(field.expectedValue));
        } else {
          await waitFor(() => expect(element).toHaveValue(field.value));
        }
      }
    }
    //save btn
    const saveButton = screen.getByRole("button", { name: /Save/i });
    expect(saveButton).toBeInTheDocument();
    // submit form
    fireEvent.click(saveButton);
    if (form.element?.checkValidity()) {
      expect(console.log).toHaveBeenCalledWith("Form is valid!");
      const employeeData = {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        startDate: "2024-01-01",
        street: "123 Street",
        city: "City of code",
        zipCode: "5001",
        state: "Alabama",
        department: "Sales",
      };
      const dispatch = jest.fn();
      dispatch(addEmployeeInfos(employeeData));
      //Modal
      expect(Modal).toBeInTheDocument();
      expect("Employee Created!").toBeInTheDocument();
      expect(screen.getByRole("button", { name: /x/i })).toBeInTheDocument();
      const Btnclose = screen.getByRole("button", { name: /close/i });
      expect(Btnclose).toBeInTheDocument();
      fireEvent.click(Btnclose);

      expect(screen.getByTestId("first-name")).toHaveValue("");
      expect(screen.getByTestId("lastName")).toHaveValue("");
      expect(screen.getByTestId("Street")).toHaveValue("");
      expect(screen.getByLabelText(/state/i)).toHaveValue("");
      expect(screen.getByTestId("city")).toHaveValue("");
      expect(screen.getByTestId("zipCode")).toHaveValue("");
      expect(screen.getByLabelText(/department/i)).toHaveValue("");
    } else {
      //err
      expect(screen.queryByText("Employee Created!")).not.toBeInTheDocument();
      DisplayMessage;
      expect(DisplayMessage).toHaveBeenCalledWith(
        "Please fill out the form correctly",
        "linear-gradient(to right, #b90909, #b90908)"
      );
      expect(console.log).toHaveBeenCalledWith("Form is invalid!");
    }
  });

  it("should display error message when form is invalid", async () => {
    renderForm();

    const saveButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(DisplayMessage).toHaveBeenCalledWith(
        "Please fill out the form correctly",
        "linear-gradient(to right, #b90909, #b90908)"
      );
      const invalidElements = document.querySelectorAll(".invalid");
      expect(invalidElements.length).toBeGreaterThan(0);
      expect(console.log).toHaveBeenCalledWith("Form is invalid!");
    });
  });
});

describe("validate", () => {
  it("valide form", async () => {
    renderForm();
    const formElement = screen.getByTestId("form") as HTMLFormElement;

    userEvent.type(screen.getByLabelText(/First Name/i), "John");
    userEvent.type(screen.getByLabelText(/Last Name/i), "Doe");
    userEvent.type(screen.getByLabelText(/Date Of Birth/i), "1990-01-01");
    userEvent.type(screen.getByLabelText(/Start Date/i), "2024-01-01");
    userEvent.type(screen.getByLabelText(/Street/i), "123 Street");
    userEvent.type(screen.getByLabelText(/City/i), "City of Code");
    userEvent.type(screen.getByLabelText(/Zip Code/i), "5001");

    const stateSelect = screen.getByLabelText(/State/i);
    userEvent.click(stateSelect);
    const stateOption = await screen.findByText("Alabama");
    userEvent.click(stateOption);

    const departmentSelect = screen.getByLabelText(/Department/i);
    userEvent.click(departmentSelect);
    const departmentOption = await screen.findByText("Sales");
    userEvent.click(departmentOption);
    const saveButton = screen.getByRole("button", { name: /Save/i });
    userEvent.click(saveButton);
    if (formElement.checkValidity()) {
      expect(formElement.checkValidity()).toBe(true);
      //open Modal
      expect(Modal).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByText("Employee Created!")).toBeInTheDocument();
      });

      const closeModalButton = screen.getByRole("button", { name: /x/i });
      userEvent.click(closeModalButton);

      //close Modal
      await waitFor(() => {
        expect(screen.queryByText("Employee Created!")).not.toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByLabelText(/First Name/i)).toHaveValue("");
        expect(screen.getByLabelText(/Last Name/i)).toHaveValue("");
        expect(screen.getByLabelText(/Date Of Birth/i)).toHaveValue("");
        expect(screen.getByLabelText(/Start Date/i)).toHaveValue("");
        expect(screen.getByLabelText(/Street/i)).toHaveValue("");
        expect(screen.getByLabelText(/City/i)).toHaveValue("");
        expect(screen.getByLabelText(/Zip Code/i)).toHaveValue("");
        expect(screen.getByLabelText(/State/i)).toHaveValue("");
        expect(screen.getByLabelText(/Department/i)).toHaveValue("");
      });
    }
  });
});
