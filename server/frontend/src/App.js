import LoginPanel from "./components/Login/Login";
import Register from "./components/Register/Register";  // Import Register Component
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Register />} />  {/* Add Register Route */}
    </Routes>
  );
}

export default App;
