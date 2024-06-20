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
