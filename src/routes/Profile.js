import {Fragment, React, useEffect, useState} from "react"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate,Link,useParams } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PostNavi from "./PostNavi";
import profile from "../css/profile.css"
import Footer from "./Footer"
import PostList from "../components/PostList";


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
      .put(`https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/users/profile/${usernum.usernum}/`,{
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
    .get(`https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/users/profile/${usernum.usernum}/`,{})
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
    .get(`https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/posts/?author=${usernum.usernum}&&page=${page}`,{

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
      { localStorage.getItem('usernum')===usernum.usernum?
        <button className="profile-modify-btn btn btn-secondary me-4 "data-bs-toggle="modal" data-bs-target="#profileModifyModal">프로필 수정</button>
      :null
      }
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
        <h1 className="modal-title fs-5" id="loginModalLabel"><FontAwesomeIcon icon={faPen}/>   Profile Modify</h1>
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
    <div className="profile-post-title mt-5">
      <h1>{profile.data.nickname}'s Posts</h1>
    </div>
    :null
}

  
 {post.results.length!==0 ? post.results.map((value)=>(

    <PostList
    id={value.pk}
    key={value.pk}
    title={value.title}
    body = {value.body}
    image = {value.image}
    profile = {value.profile}
    created_at = {value.created_at}
    modified_at = {value.modified_at}
    tag = {value.tag}
      />
 
   
    )):reason?
        <div className="loading-container"><h1 className="loading"> {reason}</h1></div>
        :<div className="loading-container">
          <h1 className="postdoesnotexist">Post does not exist</h1>
          </div>
        }
            <div className="pagebt mt-5">
            <button className="btn btn-light" onClick={later}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <block className="btn btn-secondary pgblock">{page}</block>
            <button className="btn btn-light" onClick={older}><FontAwesomeIcon icon={faAngleRight} /></button>
          </div>

          <Footer/>
      </div>
      </div>
      

)}




export default Profile;