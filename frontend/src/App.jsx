import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./screens/AddBook/AddBook";
import UpdateBook from "./screens/UpdateBook/UpdateBook";
import Books from "./screens/Books/Books";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />}></Route>
          <Route path="/add" element={<AddBook />}></Route>
          <Route path="/update/:id" element={<UpdateBook />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
