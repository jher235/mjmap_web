import {React, useEffect, useState} from "react"
import "../css/posts.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate,Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


function Posts(){
  const navigate = useNavigate()
  const [post,setPost] = useState("")


  const handleLogout=()=>{
    localStorage.clear();
    navigate('/post_list');
  }



  useEffect(()=>{
    axios
    .get("http://127.0.0.1:8000/posts/",{

    })
    .then(response=>{
      if(response.status<300){
        setPost(response.data)

      }
    })
  },[])

return(
 <div>
 <div className="">   
 <nav class="content-left navbar navbar-expand-lg bg-body-tertiary ">
  <div class="container-fluid">
    <Link to="/" class="nav-link ms-4 me-3"><a class="nav-link titlePlus ms-4" ><h1>명지도</h1></a></Link>

    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav mx-auto">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}

        <li class="nav-item">
          <a class="nav-link title">
            게시판
          </a>
        </li>
      </ul>
      <div>
      <ul class=" navbar-nav ms-auto login-margin ">
        
          {/* <a class="nav-link btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" href="#">Log In <FontAwesomeIcon icon={faArrowRightToBracket}/></a>
           */}
           {localStorage.getItem("token") ? 
             <li class="nav-item dropdown ">
                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {localStorage.getItem("username")}
                </a>
              <ul class="dropdown-menu ">
                  <li><a class="dropdown-item" href="#">Profile</a></li>
                  <li><a class="dropdown-item" onClick={handleLogout}>Log Out</a></li>
              </ul>
            </li>  : 
             <li class="nav-item"> <Link to="/login" class="nav-link btn btn-light" >Log In <FontAwesomeIcon icon={faArrowRightToBracket}/></Link></li>
           } 
        </ul>
        </div>
      </div>
    </div>
</nav>
   
  <hr className="featurette-divider"/>
   

    
    <div className="row post">
      <div className="col-md-5 order-md-2">
        <h4 className="post-title">Oh yeah, it’s that good. <span className="text-muted">See for yourself.</span></h4>
        <p className="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
      </div>
      <div className="col-md-3 order-md-1">
        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid ms-5" width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text></svg>

      </div>
      <div class="col-md-4 order-md-2 post-sub">
        <a class="post-author">by</a><br/>
        <a class="post-date">dd</a>
      </div>
    </div>

  

 
  </div>
  </div>
      
)}




export default Posts;