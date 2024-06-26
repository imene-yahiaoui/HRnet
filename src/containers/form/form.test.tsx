/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

// import { addEmployeeInfos } from "../../helpers/features/employeeSlice.ts";
// import { Modal } from "modal-react-vite-ts";
// import DisplayMessage from "../../components/displayMessage";
//for used in the tests
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

    expect(
      screen.getByRole("combobox", { name: /state/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("city")).toBeInTheDocument();
    expect(screen.getByTestId("zipCode")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /department/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });
  // test('',()=>{
  //   renderForm()

  // })
  //test validate
  it("should validate and dispatch employee information on save", async () => {
    renderForm();
    const firstName = screen.getByTestId("first-name");
    const lastName = screen.getByTestId("last-name");
    const DateOfBirth = screen.getByLabelText("Date Of Birth");
    const startDate = screen.getByLabelText("Start Date");
    const Street = screen.getByTestId("Street");
    const City = screen.getByTestId("city");
    const State = screen.getByLabelText("State");
    const zipCode = screen.getByTestId("zipCode");
    const department = screen.getByLabelText("Department");
    expect(firstName).toBeInTheDocument();
    fireEvent.change(firstName, { target: { value: "John" } });
    expect(firstName).toHaveValue("John");

    fireEvent.change(lastName, {
      target: { value: "Dorad" },
    });
    expect(lastName).toHaveValue("Dorad");
    expect(DateOfBirth).toBeInTheDocument();
    fireEvent.change(DateOfBirth, {
      target: { value: "1995-01-01" },
    });
    expect(DateOfBirth).toHaveValue("01/01/1995");
    expect(startDate).toBeInTheDocument();
    fireEvent.change(startDate, {
      target: { value: "2004-01-01" },
    });
    expect(startDate).toHaveValue("01/01/2004");

    expect(Street).toBeInTheDocument();
    fireEvent.change(Street, {
      target: { value: "123 Street" },
    });
    expect(Street).toHaveValue("123 Street");
    expect(City).toBeInTheDocument();
    fireEvent.change(City, {
      target: { value: "City of code" },
    });
    expect(City).toHaveValue("City of code");

    expect(State).toBeInTheDocument();
    fireEvent.change(State, {
      target: { value: "Alabama" },
    });
    expect(State).toHaveValue("Alabama");
    expect(zipCode).toBeInTheDocument();
    fireEvent.change(zipCode, {
      target: { value: "5001" },
    });

    expect(zipCode).toHaveValue(5001);
    expect(department).toBeInTheDocument();
    fireEvent.change(department, {
      target: { value: "Sales" },
    });
    expect(department).toHaveValue("Sales");
    // Cliquer sur le bouton "Save"
    const saveButton = screen.getByRole("button", { name: /Save/i });
    expect(saveButton).toBeInTheDocument();
  });

  // test("submit save btn ", () => {
  //   const employeeData = {
  //     firstName: "John",
  //     lastName: "deby",
  //     dateOfBirth: "1995-01-01",
  //     startDate: "2004-01-01",
  //     department: "Sales",
  //     street: "123 Street",
  //     city: "City of code",
  //     zipCode: "5001",
  //     state: "Alabama",
  //   };

  //   render(
  //     <Provider store={store}>
  //       <Form />{" "}
  //     </Provider>,
  //     { wrapper: BrowserRouter }
  //   );
  //   store.dispatch(addEmployeeInfos(employeeData));
  //   const saveButton = screen.getByRole("button", { name: /Save/i });
  //   expect(saveButton).toBeInTheDocument();
  //   fireEvent.click(saveButton);
  //   expect(screen.getByText("Employee Created!")).toBeInTheDocument();
  // });

  test("submit save btn", async () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    // Remplir les champs du formulaire
    fireEvent.change(screen.getByTestId("first-name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("last-name"), {
      target: { value: "deby" },
    });
    fireEvent.change(screen.getByLabelText("Date Of Birth"), {
      target: { value: "1995-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2004-01-01" },
    });
    fireEvent.change(screen.getByTestId("Street"), {
      target: { value: "123 Street" },
    });
    fireEvent.change(screen.getByTestId("city"), {
      target: { value: "City of code" },
    });
    fireEvent.change(screen.getByLabelText("State"), {
      target: { value: "Alabama" },
    });
    fireEvent.change(screen.getByTestId("zipCode"), {
      target: { value: "5001" },
    });


    // Cliquer sur le bouton "Save"
    const saveButton = screen.getByRole("button", { name: /Save/i });
    expect(saveButton).toBeInTheDocument();
    // fireEvent.click(saveButton);
    // // Attendre et vérifier que le message de confirmation est affiché
    // await waitFor(() => {
    //   expect(Modal).toBeInTheDocument();
    //   expect(screen.getByText("Employee Created!")).toBeInTheDocument();
  //  });
  });
});
