/**
 * App Component
 *
 * Main application component that sets up lazy loading for routes and displays a loader while routes are being loaded.
 *
 * @returns {JSX.Element} - Rendered component.
 */
import { lazy, Suspense } from "react";
import "./App.css";

function App() {
  const RoutesPath = lazy(() => import("./helpers/routesPath"));

  const renderLoader = () => <p>Loading</p>;
  return (
    <div className="App">
      <Suspense fallback={renderLoader()}>
        <RoutesPath />
      </Suspense>
    </div>
  );
}

export default App;
