import {Fragment, React, useEffect, useState} from "react"
import "../css/posts.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate,Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


function Posts(){
  const navigate = useNavigate()
  const [post,setPost] = useState({results:[]})


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
        setPost(response.data);
        console.log(post);
      }
    })
  },[])

return(
 <div>
 <div className="bgb">   
 <nav className="content-left navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid">
    <Link to="/" className="nav-link ms-4 me-3"><a className="nav-link titlePlus ms-4" ><h1>명지도</h1></a></Link>

    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav mx-auto">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}

        <li className="nav-item">
          <a className="nav-link title">
            게시판
          </a>
        </li>
      </ul>
      <div>
      <ul className=" navbar-nav ms-auto login-margin ">
        
          {/* <a class="nav-link btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" href="#">Log In <FontAwesomeIcon icon={faArrowRightToBracket}/></a>
           */}
           {localStorage.getItem("token") ? 
             <li className="nav-item dropdown ">
                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {localStorage.getItem("username")}
                </a>
              <ul className="dropdown-menu ">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" onClick={handleLogout}>Log Out</a></li>
              </ul>
            </li>  : 
             <li className="nav-item"> <Link to="/login" className="nav-link btn btn-light" >Log In <FontAwesomeIcon icon={faArrowRightToBracket}/></Link></li>
           } 
        </ul>
        </div>
      </div>
    </div>
</nav>

  
 { post.results.map((value)=>(

    <Fragment key={value.pk}>
  <hr className="featurette-divider"/>
  
    <div className="row post">
      <div className="col-md-5 order-md-2">
        <h4 className="post-title">{value.title}</h4>
        <p className="lead post-body">{value.body}</p>
      </div>
      <div className="col-md-3 order-md-1">
        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid ms-5" width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text></svg>

      </div>
      <div className="col-md-4 order-md-2 post-sub">
        <a className="post-author">by 
        <svg className="profile-image  img-fluid ms-3" width="40" height="40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/>{value.profile.image? <image>{value.profile.image}</image>:<text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text>}</svg>
          {value.profile.nickname}
          </a><br/>
        <a className="post-date">{value.published_date}</a>
      </div>
    </div>
    </Fragment>
   
))}
  

 
  </div>
  </div>
      
)}




export default Posts;