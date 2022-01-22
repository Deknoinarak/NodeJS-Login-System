// Import Modules
import React, { useState } from "react";
import "./register.css";

// Callback Function
const Register = () => {
  // UseState Variable
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    pwd: "",
    confirm: "",
  });
  const submit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const onChange = (e) => {
    const data = {
      ...user,
    };
    data[e.target.id] = e.target.value;
    setUser(data);
    console.log(user);
  };

  return (
    <center>
      <h1>Register</h1>
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          onChange={(e) => onChange(e)}
          id="firstName"
          placeholder="First Name"
          value={user.firstName}
        />
        <input
          type="text"
          onChange={(e) => onChange(e)}
          id="lastName"
          placeholder="Last Name"
          value={user.lastName}
        />
        <input
          type="text"
          onChange={(e) => onChange(e)}
          id="username"
          placeholder="Username"
          value={user.username}
        />
        <input
          type="email"
          onChange={(e) => onChange(e)}
          id="email"
          placeholder="E-mail"
          value={user.email}
        />
        <input
          type="password"
          onChange={(e) => onChange(e)}
          id="pwd"
          placeholder="Password"
          value={user.pwd}
        />
        <input
          type="password"
          onChange={(e) => onChange(e)}
          id="confirm"
          placeholder="Confirm Password"
          value={user.confirm}
        />
        <button>Register</button>
      </form>
    </center>
  );
};

export default Register;
