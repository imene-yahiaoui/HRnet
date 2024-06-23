/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import LabeledInput from "./index";
import "@testing-library/jest-dom/extend-expect";

describe("LabeledInput component", () => {
  test("renders labeled input with correct attributes", () => {
    const props = {
      name: "sarah",
      type: "text",
      nameId: "1",
      nameLable: "first-name",
      autocomplete: "first-name",
    };

    render(<LabeledInput {...props} />);

    const label = screen.getByLabelText(props.nameLable);
    const input = screen.getByRole("textbox");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", props.type);
    expect(input).toHaveAttribute("id", props.nameId);
    expect(input).toHaveAttribute("name", props.name);
    expect(input).toHaveAttribute("autoComplete", props.autocomplete);
    expect(input).toBeRequired();
  });
});
