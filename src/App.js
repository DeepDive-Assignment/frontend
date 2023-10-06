import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import { Route, Routes } from "react-router-dom";
import UpdateTask from "./pages/UpdateTask";
import Header from "./Components/Header";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<UpdateTask />} />
      </Routes>
    </div>
  );
}

export default App;
