import FormComponent from "./components/FormComponent";
import Result from "./Result";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
