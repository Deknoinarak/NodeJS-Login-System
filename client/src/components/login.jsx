// Import Modules
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Callback Function
const Login = () => {
  // Navigate
  const navigate = useNavigate();

  // UseState Variable
  const [user, setUser] = useState({
    username: "",
    pwd: "",
  });

  // Submit Function
  const submit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    axios
      .post("http://192.168.2.38:8561/api/auth/login", {
        username: user.username,
        pwd: user.pwd,
      })
      .then((res) => {
        console.log("SEND POST");
        console.log(res.data);
        // res.data.success ? navigate("/") : alert("Error While Logging In");
      });
  };

  // onChange Function
  const onChange = (e) => {
    const data = {
      ...user,
    };
    data[e.target.id] = e.target.value;
    setUser(data);
    console.log(user);
  };

  // Return HTML
  return (
    <div className="container">
      <div className="background"></div>
      <div className="form">
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={(e) => submit(e)}>
            <div className="input-form">
              <span>Username/Email</span>
              <input
                type="text"
                onChange={(e) => onChange(e)}
                id="username"
                placeholder="Username"
                value={user.username}
              />
            </div>
            <div className="input-form">
              <span>Password</span>
              <input
                type="password"
                onChange={(e) => onChange(e)}
                id="pwd"
                placeholder="Password"
                value={user.pwd}
              />
            </div>
            <button className="btn-login">Login</button>
          </form>
          <div className="bottom">
            <span>
              Don't Have An Account Yet?{" "}
              <Link className="link" to="/register">
                Try Register It Here!
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export
export default Login;
