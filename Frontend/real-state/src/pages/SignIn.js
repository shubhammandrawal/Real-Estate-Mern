import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/login.css";

const SignIn = () => {
  const [details, setDetails] = useState({
    userid: "",
    password: "",
  });

  const navigate = useNavigate();
  function onSubmit(e) {
    e.preventDefault(e);
    const { userid, password } = details;
    let url = "http://localhost:4000/api/users/signin";//add url
    axios.post(url, {
      email: userid,
      password: password,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.userId);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  }


  return (
    <div style={{ backgroundColor: "#E1F9F4" }}>
      <div className='formdiv'>
        <form
          onSubmit={(e) => onSubmit(e)}
          className="container formtag"
          style={{ width: "400px", maxWidth: "80%", maxHeight: "80%", background: "#E2E2E2", color: "gray" }}>
          <h1 style={{ color: "#4C57B6", font: "Open Sans" }}>Real Estate</h1>
          <h6>Enter your credentials to access your account</h6>
          <div className='input-group mb-3'>
            <input
              style={{ margin: "0 10px", height: "34px" }}
              type="text"
              className="form-control"
              placeholder="User ID"
              value={details.userid}
              onChange={(e) => setDetails({ ...details, userid: e.target.value })}
            />
          </div>
          <div className='input-group mb-3'>
            <input
              style={{ margin: "0 10px", height: "34px" }}
              type="password"
              id="myInput"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              onSubmit(e);
            }}
            className="btn custom-btn"
            id="form-submit"
          >
            Login
          </button>
          <span className="linkform">
            <span style={{ color: "gray",marginLeft:"25%",marginTop:"10px" }}>Don't have an account? </span>
            <Link to="/signup"><button className='custom-btn' style={{marginLeft:"20%",marginTop:"10px"}}>Sign Up</button></Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default SignIn