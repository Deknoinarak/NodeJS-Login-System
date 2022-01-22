// Import Modules
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {
  Register,
  Login
} from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" >
          <Route index element={<h1>Please <Link to="/login">Login Here</Link></h1>} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<div><h1>404 Error - Page Not Found</h1> <Link to="/">Return To Home</Link></div>} />
      </Routes>
    </Router>
  );
}

export default App;
