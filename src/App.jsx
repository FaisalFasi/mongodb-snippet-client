import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:snippet_id" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
