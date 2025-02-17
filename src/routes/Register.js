import React, { useState,useEffect } from "react";
import axios from "axios";

import {Link, useNavigate} from "react-router-dom"
import "../css/register.css";


function Register(props){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();


  
    useEffect(()=>{
      if(localStorage.getItem("token") != null){
          localStorage.clear();
      }
  },[])

    
  const handleChange = (event) => {
    const target = event.target;
    if (target.name === "username") {
      setUsername(target.value);
    } else if (target.name === "password") {
      setPassword(target.value);
    }  else if (target.name === "password2"){
        setPassword2(target.value);
    }   else if (target.name === "email"){
        setEmail(target.value);
    } else if (target.name === "nickname"){
        setNickname(target.value);
    }
        
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("[Register.js] handleSubmit");
    axios
      .post("https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/users/register/", {
        username: username,
        password: password,
        password2: password2,
        email : email,
      })
      .then((response) => {
        if (response.status < 300) {
          console.log("[Register.js] Call props.doRegister");
          if (props.doLogin) {
            props.doLogin();
          }
          navigate("/login")
        }
      })
      .catch((error)=>{
        console.error("Error:",error);
        
        console.log(error.response);
        if(error.response.data){
        const errorData = error.response.data
        for(const field in errorData){
            const errorMessage = errorData[field]
            alert(`${field}:${errorMessage[0]}`)
        }}
      })
    
  };








  return (
    <div className="body ">
      <div className="container">
    <main className="form-signup me-4">
    <form onSubmit={handleSubmit}>
      
      <h1 className=" mb-3 fw-normal logintext">Create<br/>account</h1>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          name="username"
          id="floatingInput"
          placeholder="Id"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingInput">Id</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          name="password"
          id="floatingPassword"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          name="password2"
          id="floatingPassword2"
          placeholder="Password2"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingPassword2">Password2</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          name="email"
          id="floatingEmail"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingEmail">Email</label>
      </div>
      
      <div className="checkbox mb-3">
      </div>
      <button className="w-100 btn btn-lg btn-light" type="submit">
        Sign up
      </button>
      <div className="pluslink ">
        <Link to="/" className="homelink">Home</Link>
      </div>
      
    </form>
  </main>
  </div>
  </div>
  );
}

export default Register;