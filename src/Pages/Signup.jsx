import React from "react";
import loginBoy from "../assets/loginBoy.png";
import { useState } from "react";
import "./styles.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";

const api = axios.create({
  baseURL: BACKEND_URL, // Adjust the base URL to match your backend
});

const Signup = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    cpassword: "",
    userEmail: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.cpassword !== formData.password) {
        alert("passwords don't match");
        return;
      }
      // api call
      const res = await api.post("/user/signup", formData);
      console.log(res.data);
      await localStorage.setItem("token", JSON.stringify(res.data.token));
      await localStorage.setItem("user", JSON.stringify(res.data.user));
      // reset form
      navigate("/details");
      setFormData({
        cpassword: "",
        userEmail: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // google login

  const handleGoogle = () => {
    window.location.href = `${BACKEND_URL}/oauth/google`;
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="Signup">
      <div className="signup-heading">
        <img src={loginBoy}></img>
        <h1>Create Account</h1>
        <h4>Create account so you can find all the lost things</h4>
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
          <input
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            value={formData.cpassword}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        <div>
          <div onClick={handleNavigate}>
            <h4>Already have an account</h4>
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

export default Signup;
