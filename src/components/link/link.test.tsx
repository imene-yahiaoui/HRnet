import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LinkComponent from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import "@testing-library/jest-dom/extend-expect";

describe("LinkComponent", () => {
  test("renders the link with correct text and path", () => {
    const path = "/test-path";
    const text = "Test Link";
    const id = "test-link";

    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LinkComponent path={path} text={text} id={id} />
        </MemoryRouter>
      </Provider>
    );

    const linkElement = getByTestId(id);
    // expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Test Link");
    expect(linkElement).toHaveAttribute("href", "/test-path");
  });
});
