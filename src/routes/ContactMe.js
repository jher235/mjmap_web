import React, { useState,useEffect } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import "../css/contactme.css";


function ContactMe(props){
    
    const [position, setPosition] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate();


  
    useEffect(()=>{
      if(localStorage.getItem("token") === null){
          alert("권한이 없습니다");
        navigate("/");
      }
  },[])

    
  const handleChange = (event) => {
    const target = event.target;
    console.log(target.value)
    if (target.name === "position") {
      setPosition(target.value);
    } else if (target.name === "content") {
      setContent(target.value);

    } 
        
  };
  
 

  const handleSubmit = (event) => {
    event.preventDefault();
  

    if(isSubmitting){
      return
    }

    setIsSubmitting(true);

    axios
      .post("https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/connect_me/", {
        position:position,
        content:content
      },{
        headers:{
          'Authorization': 'Token ' + localStorage.getItem("token")
        }
      })
      .then((response) => {
        if (response.status < 300) {
          alert("성공적으로 메일을 보냈습니다!")
          navigate("/")
        }
      })
      .catch((error)=>{
        console.error("Error:",error);
        
        console.log(error.response);
        if(error.response.data){
        const errorData = error.response.data
        const errorText = error.response.statusText
        alert(errorData)
        
      }}).finally(()=>{
         setIsSubmitting(false);
      })
    
      
  };








  return (
    <div className="body">
    <main className="form-signup ">
    <form onSubmit={handleSubmit}>
      
      <h1 className=" mb-3 fw-normal logintext">Connect Me</h1>
      

      <select placeholder="직책을 선택해주세요" onChange={handleChange} required name="position" className="position-select ms-4 mb-4" value={position}>
      <option value="" disabled hidden>직책을 선택해주세요</option>
        <option value="student">학생</option>
        <option value="staff">교직원</option>
        <option value="other">기타</option>
      </select>
      

      <div className="form-floating">
        <textarea
          type="text"
          className="form-control"
          name="content"
          id="floatingContent"
          placeholder="Content"
          onChange={handleChange}
          required
          maxLength={250}
        />
        <label htmlFor="floatingContent">Content</label>
      </div>

      
      

      <div className="checkbox mb-3">
      </div>
      <button className="w-50 uploadbt btn btn-lg btn-light mt-5" >
        Send Mail
      </button>
      <div className="pluslink ">
        <Link to="/" className="homelink">Home</Link>
    
      </div>
      
    </form>
  </main>
  </div>
  );
}

export default ContactMe;