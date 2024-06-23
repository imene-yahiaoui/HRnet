/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import Form from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
// import DisplayMessage from "../../components/displayMessage";

describe("Form component", () => {
  test("renders Form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      </Provider>
    );
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

 
});
