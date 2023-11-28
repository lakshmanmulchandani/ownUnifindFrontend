import React from "react";
import loginBoy from "../assets/loginBoy.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { BACKEND_URL } from "../constants";

const api = axios.create({
  baseURL: BACKEND_URL,
});

const Login = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNavigate = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await api.post("/user/login", formData);
      console.log(response);
      if(response.status===200)
      {
        const token = response.data.token;
        const user = response.data.user;
  
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        // Reset the form
        setFormData({
          userEmail: "",
          password: "",
        });
        navigate("/details");
      }
      else {
        alert(response.data.message)
      }
   
    } catch (error) {

      alert("Invalid Credentials:Check your email address and password")
      console.error(error);
    }
  };

  const handleGoogle = () => {
    window.location.href = `${BACKEND_URL}/oauth/google`;
  };

  return (
    <div className="Signup">
      <div className="signup-heading">
        <img src={loginBoy}></img>
        <h1>Login Here</h1>
        <h4>Found your things</h4>
      </div>
      <div className="signup-form">
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            value={formData.userEmail}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <div
            style={{
              color: "#1F41BB",
              fontSize: "14px",
              textAlign: "right",
              width: "80%",
              marginTop: "10px",
            }}
          >
            {" "}
            Forgot your password?{" "}
          </div>
          <button type="submit">Sign in</button>
        </form>
        <div>
          <div onClick={handleNavigate}>
            <h4>Create new account</h4>
          </div>
        </div>
        <div className="social-login">
          <p style={{ color: "#1F41BB" }}>or continue with</p>
          <div className="social-buttons">
            <i onClick={handleGoogle} class="fa fa-google" id="icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
