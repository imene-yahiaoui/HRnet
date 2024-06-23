import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";
import { Provider } from "react-redux";
import { store } from "../../store.ts";
import { MemoryRouter } from "react-router-dom";

describe("Header component", () => {
test("header title", () => {
    const title = "HRnet";
    
    const { getByText } = render(
 
    <Provider store={store}>
      <MemoryRouter>
        <Header  title={title}/>
      </MemoryRouter>
    </Provider>
  );
  const header =getByText(title); 
  expect(header).toBeInTheDocument();
 
});

})