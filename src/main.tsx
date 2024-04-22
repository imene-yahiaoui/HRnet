/**
 * Main rendering function
 *
 * Renders the main App component wrapped with BrowserRouter 
 *
 * @returns {void}
 */
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
 

ReactDOM.createRoot(document.getElementById("root")!).render(
 
      <BrowserRouter>
        <App />
      </BrowserRouter>
 
);