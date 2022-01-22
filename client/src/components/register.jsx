// Import Modules
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

// Callback Function
const Register = () => {
  // Navigate
  const navigate = useNavigate();

  // UseState Variable
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    pwd: "",
    confirm: "",
  });

  // Submit Function
  const submit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (user.pwd === user.confirm) {
      axios
        .post("http://192.168.2.38:8561/api/auth/register", {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          pwd: user.pwd,
          confirm: user.confirm,
        })
        .then((res) => {
          console.log("SEND POST");
          console.log(res.data);
          res.data.success
            ? navigate("/")
            : alert("Error While Register New User!");
        });
    } else {
      alert("Password And Confirm Password Is Not The Same!");
    }
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
          <h1>Register</h1>
          <form onSubmit={(e) => submit(e)}>
            <div className="input-form name">
              <span>Name</span>
              <input
                type="text"
                onChange={(e) => onChange(e)}
                id="firstName"
                placeholder="John"
                value={user.firstName}
                required
              />
              <input
                type="text"
                onChange={(e) => onChange(e)}
                id="lastName"
                placeholder="Doe"
                value={user.lastName}
                required
              />
            </div>
            <div className="input-form">
              <span>E-mail</span>
              <input
                type="email"
                onChange={(e) => onChange(e)}
                id="email"
                placeholder="example@domain.com"
                value={user.email}
                required
              />
            </div>
            <div className="input-form">
              <span>Username</span>
              <input
                type="text"
                onChange={(e) => onChange(e)}
                id="username"
                placeholder="Username..."
                value={user.username}
                required
              />
            </div>
            <div className="input-form">
              <span>Password</span>
              <input
                type="password"
                onChange={(e) => onChange(e)}
                id="pwd"
                placeholder="Password..."
                value={user.pwd}
                required
              />
            </div>
            <div className="input-form">
              <span>Confirm Password</span>
              <input
                type="password"
                onChange={(e) => onChange(e)}
                id="confirm"
                placeholder="Confirm Password..."
                value={user.confirm}
                required
              />
            </div>
            <button className="btn-login">Register</button>
          </form>
          <div className="bottom">
            <span>
              Already Have An Account?{" "}
              <Link className="link" to="/login">
                Login Here!
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export
export default Register;
