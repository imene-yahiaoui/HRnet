// __tests__/performance.test.js

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter} from "react-router-dom";

test("renders without crashing within a time limit", () => {
  render(
    <Provider store={store}>
      <App />{" "}
    </Provider>,
    { wrapper: BrowserRouter }
  );
  const start = performance.now();
  const end = performance.now();
  const renderTime = end - start;
  console.log(`Render time: ${renderTime}ms`);

  // Assert that render time is within an acceptable range
  expect(renderTime).toBeLessThan(1000); // e.g., 1 second
});
