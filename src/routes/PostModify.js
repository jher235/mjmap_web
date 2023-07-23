import React, { useState,useEffect } from "react";
import axios from "axios";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useNavigate, useParams} from "react-router-dom"
import "../css/postmodify.css";


function PostModify(props){
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [nickname, setNickname] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [preImage, setPreImage] = useState(null);
    const [preFile, setPreFile] = useState(null);
    const [ddimage, setDdimage] = useState(false);
    const navigate = useNavigate();
    const postid = useParams();

  
    useEffect(()=>{
      if(localStorage.getItem("token") === null){
          alert("권한이 없습니다");
        navigate("/");
      }
    },[])

    useEffect(()=>{
        axios
            .get(`http://localhost:8000/posts/${postid.postId}/`,{})
            .then((response)=>{
                if(response.status <300){
                    console.log(response);
                    setTitle(response.data.title);
                    setContent(response.data.body);
                    setCategory(response.data.category);
                    // if(response.data.image!==null){
                    //   const defaultImage = new FileList()
                    // }
                    // setPreImage(response.data.image);
                    // setPreFile(response.data.file);
                }
            })
            .catch((error)=>{
                console.log("에러발생!"+error);
            })
    },[])
    useEffect(()=>{
      console.log(image)

     },[image,file])

  
  const deletedefaultimage=(event)=>{
    event.preventDefault();
    setDdimage(true);
  }
    
  const handleChange = (event) => {
    const target = event.target;
    if (target.name === "title") {
      setTitle(target.value);
    } else if (target.name === "content") {
      setContent(target.value);
    }  else if (target.name === "image"){
        setImage(target.files);
        console.log(image);
    }   else if (target.name === "category"){
        setCategory(target.value);
    } else if (target.name === "file"){
      setFile(target.files)
    } 
        
  };
  
 

  const handleSubmit = (event) => {
    event.preventDefault();

    

  const requestdata = new FormData();
  requestdata.append("title",title);
  requestdata.append("body", content);
  requestdata.append("category", category);

  if (image !==null && image.length!==0 ){
    for(let i=0; i<image.length; i++)
    requestdata.append("image", image[i]);
  }
  if (file !== null && file.length !==0){
    for(let i=0; i<file.length; i++)
    requestdata.append("file", file[i]);
  }
  if(ddimage===true){
    requestdata.append("remove_image",ddimage);
  }
 
  



    console.log("[Register.js] handleSubmit");
    axios
      .put(`http://localhost:8000/posts/${postid.postId}/`, requestdata,{
        headers:{
          'Content-Type': "multipart/form-data",
          'Authorization': 'Token ' + localStorage.getItem("token")
        }
      })
      .then((response) => {
        if (response.status < 300) {
          console.log("[Register.js] Call props.doRegister");
          if (props.doLogin) {
            props.doLogin();
          }
          navigate(`/posts/${postid.postId}`)
        }
      })
      .catch((error)=>{
        console.error("Error:",error);
        
        console.log(error.response);
        if(error.response.data){
        const errorData = error.response.data
        const errorText = error.response.statusText
        alert(errorData)
        
      }})
    
  };








  return (
    <div className="body">
    <main className="form-signup ">
    <form onSubmit={handleSubmit}>
      
      <h1 className=" mb-3 fw-normal logintext">Create Post</h1>
      <div className="form-floating">
        <textarea
          type="text"
          className="form-control"
          name="title"
          id="floatingTitle"
          placeholder="Id"
          onChange={handleChange}
          required
          defaultValue={title}
        />
        <label htmlFor="floatingTitle">Title</label>
      </div>

      <div className="form-floating">
        <textarea
          type="text"
          className="form-control"
          name="content"
          id="floatingContent"
          placeholder="Content"
          onChange={handleChange}
          defaultValue={content}
          required
        />
        <label htmlFor="floatingContent">Content</label>
      </div>

    <div className="img-container">
      <div className="form-floating">
        <input
          type="file"
          className="form-control"
          name="image"
          id="floatingImage"
          placeholder="Image"
          onChange={handleChange}
          defaultValue={image}
         multiple 
         accept="image/*"
        />
        <label htmlFor="floatingImage">Image</label>
      </div>
      <button className="btn btn-light deletedefaultbtn" onClick={deletedefaultimage}>기존 이미지 삭제</button>
      </div>

      <div className="form-floating">
        <input
          type="file"
          className="form-control"
          name="file"
          id="floatingFile"
          placeholder="file"
          onChange={handleChange}
          defaultValue={file}
          multiple
       />
        <label htmlFor="floatingFile">File</label>
      </div>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          name="category"
          id="floatingCategory"
          placeholder="Category"
          onChange={handleChange}
          defaultValue={category}
        />
        <label htmlFor="floatingCategory">Category</label>
      </div>
      

      <div className="checkbox mb-3">
      </div>
      <button className="w-50 uploadbt btn btn-lg btn-light" type="submit">
        Upload Post
      </button>
      <div className="pluslink ">
        <Link to="/" className="homelink">Home</Link>
        <Link to="/posts" className="homelink">Back</Link>
      </div>
      
    </form>
  </main>
  </div>
  );
}

export default PostModify;