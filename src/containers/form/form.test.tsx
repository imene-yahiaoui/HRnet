import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import DisplayMessage from "../../components/displayMessage";

import { Modal } from "modal-react-vite-ts";
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

  it("should validate and dispatch employee information on save", async () => {
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

    const saveButton = screen.getByRole("button", { name: /Save/i });
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);
    if (form.element?.checkValidity()) {
      expect(Modal).toBeInTheDocument();
    } else {
      expect(DisplayMessage).toHaveBeenCalledWith(
        "Please fill out the form correctly",
        "linear-gradient(to right, #b90909, #b90908)"
      );
    }
  });
});
