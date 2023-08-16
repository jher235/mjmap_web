import React, { useState,useEffect} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom"
import "../css/login.css";



function Login(props){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("[Login.js] handleSubmit");
    axios
      .post("https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/users/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status < 300) {
          console.log("[Login.js] Call props.doLogin");
          if (props.doLogin) {
            props.doLogin();
          }
          localStorage.setItem("token", response.data["token"]);
          localStorage.setItem("userId", response.data["UserID"]);
          localStorage.setItem("username", username);
          localStorage.setItem("usernum", response.data["usernum"])
          console.log(response.data);
          navigate("/");
        }
      })
      .catch((error)=>{
        console.error("Error:",error);
        alert("사용자 정보가 존재하지 않습니다!")

      })
  };








  return (
    <div className="container">
    <main className="form-signin ">
    <form onSubmit={handleSubmit}>
      
      <h1 className=" mb-3 fw-normal logintext">Log In</h1>
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
      <div className="checkbox mb-3">
      </div>
      <button className="w-100 btn btn-lg btn-light" type="submit">
        Sign in
      </button>
      <div className="pluslink ">
        <Link to="/" className="homelink">Home</Link>
        <Link to="/register" className="calink" >Create<br/>account</Link>
      </div>
    </form>

  </main>

  </div>
  );
}

export default Login;