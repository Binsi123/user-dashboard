import "./App.css";
import UserList from "./Pages/UserList";
import UserDetails from "./Pages/UserDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
