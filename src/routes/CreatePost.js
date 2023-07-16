import React, { useState,useEffect } from "react";
import axios from "axios";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom"
import "../css/createpost.css";


function CreatePost(props){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();


  
    useEffect(()=>{
      if(localStorage.getItem("token") === null){
          alert("권한이 없습니다");
        navigate("/");
      }
  },[])

    
  const handleChange = (event) => {
    const target = event.target;
    if (target.name === "title") {
      setUsername(target.value);
    } else if (target.name === "password") {
      setPassword(target.value);
    }  else if (target.name === "password2"){
        setPassword2(target.value);
    }   else if (target.name === "email"){
        setEmail(target.value);
    } else if (target.name === "nickname"){
        setNickname(target.value);
    } else if (target.name === "file"){
      setFile(target.files)
    } else if(target.name === "image"){
      setImage(target.files)
    }
        
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("[Register.js] handleSubmit");
    axios
      .post("http://localhost:8000/users/register/", {
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
    <div className="body">
    <main className="form-signup ">
    <form onSubmit={handleSubmit}>
      
      <h1 className=" mb-3 fw-normal logintext">Create Post</h1>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          name="title"
          id="floatingTitle"
          placeholder="Id"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingTitle">Title</label>
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

      <div className="form-floating">
        <input
          type="file"
          className="form-control"
          name="file"
          id="floatingFile"
          placeholder="file"
          onChange={handleChange}
          multiple
        />
        <label htmlFor="floatingFile">File</label>
      </div>

      <div className="form-floating">
        <input
          type="file"
          className="form-control"
          name="email"
          id="floatingImage"
          placeholder="Image"
          onChange={handleChange}
         multiple 
         accept="image/*"
        />
        <label htmlFor="floatingImage">Image</label>
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
  );
}

export default CreatePost;