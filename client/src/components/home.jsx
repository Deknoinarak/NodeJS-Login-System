// Import Modules
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Callback Function
const Home = () => {
  // Navigate
  //   const navigate = useNavigate();

  // UseState Variable
  const [user, setUser] = useState({
    user_id: "",
  });

  // Get User Info
  //   const userInfo =
  useEffect(() => {
    axios.get("http://192.168.2.38:8561/api/auth/get-user").then((res) => {
      console.log("SEND POST");
      console.log(res);
      setUser(res);
    });
  }, []);

  // Return HTML
  return (
    <div className="container">
      <h1>User Info:</h1>
      {user.user_id !== "" ? (
        <Link to="/login">Please login</Link>
      ) : (
        user.user_id
      )}
    </div>
  );
};

// Export
export default Home;
