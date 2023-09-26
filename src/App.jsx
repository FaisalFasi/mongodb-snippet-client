import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import SnippetEditor from "./components/SnippetEditor";
import Home from "./components/Home";
import SnippetList from "./components/SnippetList";
import "./App.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:snippet_id" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
