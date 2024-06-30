import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Employees from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { MemoryRouter } from "react-router-dom";

describe("Employees component", () => {
  test("render Employees page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Employees />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Current Employees")).toBeInTheDocument();
    expect(screen.getByText("Search:")).toBeInTheDocument();
  });
});

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));
