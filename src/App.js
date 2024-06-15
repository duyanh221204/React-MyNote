import { Routes, Route, Link } from "react-router-dom";
import "./App.css"
import Home from "./Home"
import CreateNote from "./CreateNote";
import RecycleBin from "./RecycleBin";

const App = () =>
{
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Note/-1">Add a note</Link>
          </li>
          <li>
            <Link to="/RecycleBin">Recycle Bin</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Note/:id" element={ <CreateNote /> } />
        <Route path="/RecycleBin" element={ <RecycleBin /> } />
      </Routes>
    </div>
  );
}

export default App;