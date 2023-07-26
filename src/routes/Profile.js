import {Fragment, React, useEffect, useState} from "react"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate,Link,useParams } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PostNavi from "./PostNavi";
import profile from "../css/profile.css"


function Profile(){
  const navigate = useNavigate()
  const [post,setPost] = useState({results:[]})
  const [page,setPage] = useState(1)
  const [next, setNext] = useState(null)
  const [previous,setPrevious] = useState(null)
  const [reason,setReason] = useState(null)
  const [postId, setPostId] = useState("")
  const [profile, setProfile] = useState("")
  const [profileImage,setProfileImage] = useState()
  const [profileNickname, setProfileNickname] = useState()

  const usernum = useParams()

  const handleChange=(event)=>{
      const target = event.target;
      if(target.name === "image"){
        setProfileImage(target.files[0]);
      }
      if(target.name === "nickname"){
        setProfileNickname(target.value);
      }
  }

  const handleModifyProfile = (event)=>{
      axios
      .put(`http://127.0.0.1:8000/users/profile/${usernum.usernum}/`,{
        nickname:profileNickname,
        image:profileImage
      },
      { 
        headers:{
          'Content-Type': "multipart/form-data",
          'Authorization': 'Token ' + localStorage.getItem("token")
        }
      })
      .then((response)=>{
        if(response.status<300){
          window.location.assign(`/profile/${usernum.usernum}`);
        }
      })
      .catch((error)=>{
        console.log(error);
      })
  }

 function handlePostDetail(postId){
    navigate(`/posts/${postId}`);

  }


  const older=()=>{
    if(next !== null)
    setPage(page+1);
  }
  const later=()=>{
    if(previous !== null){
    setPage(page-1);
    }
  }

  useEffect(()=>{
    axios
    .get(`http://127.0.0.1:8000/users/profile/${usernum.usernum}/`,{})
    .then((response)=>{
      if(response.status<300){
        console.log(response);
        setProfile(response)
      }
    })
    .catch((error)=>{
      console.log(error);
    })
    
  },[])

  useEffect(()=>{
    axios
    .get(`http://127.0.0.1:8000/posts/?author=${usernum.usernum}&&page=${page}`,{

    })
    .then(response=>{
      if(response.status<300){
        setPost(response.data);
        console.log(post);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        // console.log(next, previous)
        // console.log("page"+page)
      }
    })
    .catch((error)=>{
        console.log(error);
        console.log(usernum)
        setReason(error.message);
        console.log(reason);
    })
  },[page])

return(
 <div>
  
 <div className="bgb">   
  <PostNavi/>
  <div className="col-md-5 profilebox">
    <div className="profile-title-btn-container">
      <h1 className="profile-title ms-3">Profile Card</h1>
      <button className="profile-modify-btn btn btn-secondary me-4 "data-bs-toggle="modal" data-bs-target="#profileModifyModal">프로필 수정</button>
    </div>
      <div className="profile-content ms-5">
        {profile?
        <>
          UserImage :  <img src={profile.data.image} className="profile-image  img-fluid ms-3 me-3" width="100" height="100"/>
          <br/>
          <br/>
          NickName  : <a className="profile-nickname">{profile.data.nickname}</a>
          
        </>
          :null
        }
      </div>
  </div>

  <div className="modal fade" id="profileModifyModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="loginModalLabel"><FontAwesomeIcon icon={faArrowRightToBracket}/>   Profile Modify</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <text className="profileModalWord">My-Image</text><br/>
       <input 
       className=""
       type="file"
       name="image"
       onChange={handleChange}
       ></input>
       <br/>
       <br/>
       <text className="profileModalWord">My-NickName</text>
       <input 
       className="loginInput" 
       onChange={handleChange}
       name="nickname"
       ></input>
       
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary me-auto" data-bs-dismiss="modal" href="#">Cancel</button>
        <button type="button" className="btn btn-secondary" onClick={handleModifyProfile}>Modify</button>
      </div>
    </div>
  </div>
</div>


{profile?
    <div className="profile-post-title ">
      <h1>{profile.data.nickname}'s Posts</h1>
    </div>
    :null
}

  
 {post.results.length!==0 ? post.results.map((value)=>(

    <Fragment key={value.pk}>
      
  <hr className="featurette-divider"/>
  
    <div className="row post" onClick={()=>handlePostDetail(value.pk)}>
      <div className="col-md-5 order-md-2">
        <h4 className="post-title">{value.title}</h4>
        <p className="lead post-body">{value.body}</p>
      </div>
      <div className="col-md-3 order-md-1">
      {value.image?<img src={value.image} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid ms-5"  width="150" height="150"/>
          :<svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid ms-5" width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text></svg>
        }
      </div>
      <div className="col-md-4 order-md-2 post-sub">
        <a className="post-author">
        <div>
                    by 
                    {value.profile?
                    <>
                        <img src={value.profile.image} className="profile-image  img-fluid ms-3 me-3" width="40" height="40"/>
                        {value.profile.nickname}
                    </>
                    :<>
                    {/* <a>Loading...</a> */}
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </>
                    }
                  </div>
          </a>
          <br/>
          <br/>
        <a className="post-date"> {new Date(value.published_date).toLocaleString()}</a>
      </div>
    </div>
    </Fragment>
   
    )):reason?
        <div className="loading-container"><h1 className="loading"> {reason}</h1></div>
        :<div className="loading-container">
          <h1 className="postdoesnotexist">Post does not exist</h1>
          </div>
        }
            <div className="pagebt">
            <button className="btn btn-light" onClick={later}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <block className="btn btn-secondary pgblock">{page}</block>
            <button className="btn btn-light" onClick={older}><FontAwesomeIcon icon={faAngleRight} /></button>
          </div>
      </div>
      </div>
      

)}




export default Profile;