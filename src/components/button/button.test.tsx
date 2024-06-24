import { render, fireEvent } from "@testing-library/react";
import Button from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Button component", () => {
  test("renders button with correct text", () => {
    const clickHandler = jest.fn();
    const buttonText = "Click Me";

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Button click={clickHandler} btnName={buttonText} />
        </MemoryRouter>
      </Provider>
    );

    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  test("calls click handler when button is clicked", () => {
    const clickHandler = jest.fn();
    const buttonText = "Click Me";

    const { getByText } = render(
      <Button click={clickHandler} btnName={buttonText} />
    );

    const button = getByText(buttonText);
    fireEvent.click(button);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
