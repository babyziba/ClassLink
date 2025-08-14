import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GetStarted from "./pages/get_started";
import Signup     from "./pages/signup";
import Login      from "./pages/Login";
import Home       from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/get_started" replace />} />
        <Route path="/get_started" element={<GetStarted />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
