import {Fragment, React, useEffect, useState} from "react"
import "../css/posts.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate,Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";




function PostNavi(){

    const navigate = useNavigate()
    const [myNickname, setMyNickname] = useState("") 
    const [myImage, setMyImage ] = useState("")

    const handleLogout=()=>{
        localStorage.clear();
        navigate('/posts');
      }
    

      useEffect(()=>{
        axios
        .get(`http://127.0.0.1:8000/users/profile/${localStorage.getItem('usernum')}/`,{})
        .then((response)=>{
          if(response.status<300){
              setMyNickname(response.data.nickname);
              setMyImage(response.data.image);
          }
        })
        .catch((error)=>{
          console.log(error);
        })
      },[])

    return(
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
          <Link to="/posts" className="nav-link title">
            게시판
          </Link>
        </li>
      </ul>
      <div>
      <ul className=" navbar-nav ms-auto login-margin ">
        
          {/* <a class="nav-link btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" href="#">Log In <FontAwesomeIcon icon={faArrowRightToBracket}/></a>
           */}
           {localStorage.getItem("token") ? 
             <li className="nav-item dropdown ">
                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {myNickname!==""?
                    <>
                    <img src={myImage} className="profile-image  img-fluid ms-3 me-3" width="40" height="40"/>
                     {myNickname}
                  </>
                  :<a>Loading..</a>}
                </a>
              <ul className="dropdown-menu ">
                  <li><Link to={`/profile/${localStorage.getItem("usernum")}`} className="dropdown-item">Profile</Link></li>
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
)
}



export default PostNavi