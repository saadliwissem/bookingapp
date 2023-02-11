import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Hotel } from "./pages/Hotel";
import { Hotels } from "./pages/Hotels";
import { Login } from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Hotels/find/:id" element={<Hotel />}></Route>
        <Route path="/Hotels" element={<Hotels />}></Route>
        <Route path="/login" element={<Login />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
