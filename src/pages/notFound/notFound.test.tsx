import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NotFound from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { BrowserRouter } from "react-router-dom";

test("render NotFound page", () => {
  render(
    <Provider store={store}>
      <NotFound />{" "}
    </Provider>,
    { wrapper: BrowserRouter }
  );

  expect(
    screen.getByText("Retourner sur la page d'accueil")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Retourner sur la page d'accueil").closest("a")
  ).toHaveAttribute("href", "/");
});
