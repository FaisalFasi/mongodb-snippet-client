import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import SnippetDetail from "./components/SnippetDetail";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/:snippet_id" element={<SnippetDetail />} />
        </Routes>
      </BrowserRouter>
      <p className="read-the-docs">Im on every page </p>
    </div>
  );
}

export default App;
