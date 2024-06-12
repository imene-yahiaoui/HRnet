import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { MemoryRouter } from "react-router-dom";

test("render home page", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText("HRnet")).toBeInTheDocument();
  expect(screen.getByText("Create Employee")).toBeInTheDocument();
  expect(window.location.pathname).toBe("/");
});
