import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import RoutesPath from "./index";
import "@testing-library/jest-dom/extend-expect";
// Mock the pages
jest.mock("../../pages/home", () => () => <div>Home Page</div>);
jest.mock("../../pages/Employees", () => () => <div>Employees Page</div>);
jest.mock("../../pages/notFound", () => () => <div>404 Not Found</div>);

describe("RoutesPath", () => {
  it("should render Home component for the default route", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <RoutesPath />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("should render Employees component for /Employees route", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/Employees"]}>
          <RoutesPath />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Employees Page")).toBeInTheDocument();
  });

  it("should render NotFound component for any unmatched route", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/some/random/route"]}>
          <RoutesPath />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
  });
});
